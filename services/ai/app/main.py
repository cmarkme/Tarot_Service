import json
import os
import re
from typing import Dict, Any, List

from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from llama_cpp import Llama

APP_PORT = int(os.getenv("PORT", "8080"))
SECRET = os.getenv("AI_SHARED_SECRET", "")
MODEL_PATH = os.getenv("MODEL_PATH", "/models/model.gguf")
MEANINGS_PATH = os.getenv("MEANINGS_PATH", "/data/tarotMeanings.json")


# CPU / stability tuned defaults for Cloud Run 2 vCPU
N_THREADS = int(os.getenv("N_THREADS", "2"))
N_CTX = int(os.getenv("N_CTX", "2048"))
MAX_TOKENS = int(os.getenv("MAX_TOKENS", "300"))

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
ALL_CARD_TOKENS = sorted(set(
    [k.lower() for k in TAROT_MEANINGS.keys()] +
    [KEY_TO_NAME[k].lower() for k in TAROT_MEANINGS.keys()]
), key=len, reverse=True)

def extract_cards(text: str) -> List[str]:
    t = text.lower()
    found = []
    for tok in ALL_CARD_TOKENS:
        if tok and tok in t:
            # normalize back to dataset keys
            # try exact key match first, else match by "pretty name"
            for k in TAROT_MEANINGS.keys():
                if tok == k.lower() or tok == KEY_TO_NAME[k].lower():
                    if k not in found:
                        found.append(k)
    return found[:3]  # keep it small

def is_off_topic(text: str) -> bool:
    # Strict: if no card mentioned, treat as off-topic.
    # Also block obvious domains explicitly.
    bad = [
        "diagnose", "symptom", "medication", "lawsuit", "legal", "contract",
        "invest", "stock", "crypto", "loan", "bet", "gambling", "tax",
        "should i", "what should i do", "tell me what to do", "life decision"
    ]
    t = text.lower()
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

llm = Llama(
    model_path=MODEL_PATH,
    n_threads=N_THREADS,
    n_ctx=N_CTX,
    n_batch=128,
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

@app.post("/chat")
async def chat(payload: ChatIn, request: Request):
    # Basic shared-secret auth (cheap + simple)
    if not SECRET:
        raise HTTPException(status_code=500, detail="Server missing AI_SHARED_SECRET")
    incoming = request.headers.get("x-ai-shared-secret", "")
    if incoming != SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")

    msg = (payload.message or "").strip()
    card_keys = extract_cards(msg)

    if not card_keys:
        return {"reply": "I can help with tarot meanings only. Tell me the card name(s) (e.g., “00-TheFool” / “The Fool”) and whether you want upright or reversed."}

    if is_off_topic(msg):
        return {"reply": "I can’t help with medical/legal/financial advice or life decisions. If you share the tarot card(s) you drew, I can explain their meanings and symbolism."}

    data_snippet = build_context_snippet(card_keys)

    prompt = f"""{SYSTEM_RULES}

TAROT DATA (the ONLY source of truth):
{data_snippet}

User: {msg}
Assistant:"""

    out = llm(prompt, max_tokens=MAX_TOKENS, temperature=0.2, top_p=0.9, repeat_penalty=1.1)
    reply = out["choices"][0]["text"].strip()
    return {"reply": reply}