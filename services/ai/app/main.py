import json
import os
import re
import hmac
from typing import Dict, Any, List

from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from llama_cpp import Llama


# -------------------------
# Environment / config
# -------------------------
APP_PORT = int(os.getenv("PORT", "8080"))

# Shared secret (trim to avoid newline issues)
SECRET = (os.getenv("AI_SHARED_SECRET", "") or "").strip()

MODEL_PATH = os.getenv("MODEL_PATH", "/models/model.gguf")
MEANINGS_PATH = os.getenv("MEANINGS_PATH", "/data/tarotMeanings.json")

# Performance knobs
# Use ALL available CPUs by default (Cloud Run 4 vCPU => 4 threads)
LLAMA_THREADS = int(os.getenv("LLAMA_THREADS", str(os.cpu_count() or 4)))

# Context size: smaller tends to be faster (2048 is okay; try 1536 or 1024 if needed)
N_CTX = int(os.getenv("N_CTX", "2048"))

# Batch size can speed up prompt evaluation (keep 128–512 range)
N_BATCH = int(os.getenv("N_BATCH", "256"))

# Cap output tokens HARD (important to avoid random “long rambles”)
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "220"))

# Sampling (lower temp makes it more concise/consistent)
TEMPERATURE = float(os.getenv("TEMPERATURE", "0.2"))
TOP_P = float(os.getenv("TOP_P", "0.9"))
REPEAT_PENALTY = float(os.getenv("REPEAT_PENALTY", "1.1"))


app = FastAPI()


class ChatIn(BaseModel):
    message: str
    context: Dict[str, Any] | None = None


def load_meanings() -> Dict[str, Any]:
    with open(MEANINGS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


TAROT_MEANINGS = load_meanings()

# Build quick lookup maps
KEY_TO_NAME = {k: k.replace("-", " ").replace("_", " ") for k in TAROT_MEANINGS.keys()}

ALL_CARD_TOKENS = sorted(
    set([k.lower() for k in TAROT_MEANINGS.keys()] + [KEY_TO_NAME[k].lower() for k in TAROT_MEANINGS.keys()]),
    key=len,
    reverse=True,
)


def extract_cards(text: str) -> List[str]:
    t = (text or "").lower()
    found = []
    for tok in ALL_CARD_TOKENS:
        if tok and tok in t:
            for k in TAROT_MEANINGS.keys():
                if tok == k.lower() or tok == KEY_TO_NAME[k].lower():
                    if k not in found:
                        found.append(k)
    return found[:3]


def is_off_topic(text: str) -> bool:
    # Strict: if no card mentioned, treat as off-topic.
    bad = [
        "diagnose",
        "symptom",
        "medication",
        "lawsuit",
        "legal",
        "contract",
        "invest",
        "stock",
        "crypto",
        "loan",
        "bet",
        "gambling",
        "tax",
        "should i",
        "what should i do",
        "tell me what to do",
        "life decision",
    ]
    t = (text or "").lower()
    return any(b in t for b in bad)


SYSTEM_RULES = """You are a tarot meanings assistant.
You MUST answer ONLY using the provided Tarot meanings data.
If the user asks for medical, legal, financial advice, or life decisions, refuse briefly and redirect to tarot meanings.
If the user asks to predict the future, refuse and explain you only interpret symbolism/meanings, not predict outcomes.
Output format:
- Card(s) mentioned
- Upright vs reversed (only if user asks)
- Keywords
- Short interpretation
- Reflection prompts (max 2 questions)
Be concise and friendly.
"""


# -------------------------
# Model init (IMPORTANT: do this ONCE)
# -------------------------
# This is where the big speed win happens:
# If threads defaulted to 1 before, setting LLAMA_THREADS=4 and n_threads=4 makes a huge difference on 4 vCPU.
llm = Llama(
    model_path=MODEL_PATH,
    n_threads=LLAMA_THREADS,     # <- IMPORTANT
    n_ctx=N_CTX,                 # smaller context = faster (try 1024/1536 if needed)
    n_batch=N_BATCH,             # helps prompt eval speed
    use_mmap=True,
    use_mlock=False,
    n_gpu_layers=0,
    verbose=False,
)


def build_context_snippet(card_keys: List[str]) -> str:
    parts = []
    for k in card_keys:
        m = TAROT_MEANINGS.get(k, {})
        parts.append(
            f"Card: {k}\n"
            f"Upright: {m.get('upright','')}\n"
            f"Reversed: {m.get('reversed','')}\n"
            f"Keywords: {', '.join(m.get('keywords', []))}\n"
        )
    return "\n---\n".join(parts)


def check_shared_secret(request: Request) -> None:
    # Trim both sides and compare safely.
    if not SECRET:
        raise HTTPException(status_code=500, detail="Server missing AI_SHARED_SECRET")

    incoming = (request.headers.get("x-ai-shared-secret", "") or "").strip()
    expected = SECRET  # already stripped above

    if not hmac.compare_digest(incoming, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.post("/chat")
async def chat(payload: ChatIn, request: Request):
    # Basic shared-secret auth (cheap + simple)
    check_shared_secret(request)

    msg = (payload.message or "").strip()
    card_keys = extract_cards(msg)

    if not card_keys:
        return {
            "reply": "I can help with tarot meanings only. Tell me the card name(s) (e.g., “00-TheFool” / “The Fool”) and whether you want upright or reversed."
        }

    if is_off_topic(msg):
        return {
            "reply": "I can’t help with medical/legal/financial advice or life decisions. If you share the tarot card(s) you drew, I can explain their meanings and symbolism."
        }

    data_snippet = build_context_snippet(card_keys)

    prompt = f"""{SYSTEM_RULES}

TAROT DATA (the ONLY source of truth):
{data_snippet}

User: {msg}
Assistant:"""

    # Hard-cap output to avoid random “minute-long” generations.
    out = llm(
        prompt,
        max_tokens=MAX_TOKENS,          # <- IMPORTANT
        temperature=TEMPERATURE,
        top_p=TOP_P,
        repeat_penalty=REPEAT_PENALTY,
        stop=["\nUser:", "\nUSER:", "\n\nUser:", "\n\nUSER:"],  # helps prevent runaway
    )

    reply = out["choices"][0]["text"].strip()
    return {"reply": reply}