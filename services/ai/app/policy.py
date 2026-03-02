import hmac
import re

BANNED_TOPICS = [
    "medical", "diagnos", "treatment", "medication", "dose", "doctor",
    "legal", "lawsuit", "attorney", "contract", "sue",
    "financial advice", "invest", "stock", "crypto", "forex", "loan", "debt",
    "should i", "tell me what to do", "make a decision", "break up", "leave my job",
]

FUTURE_TELLING = [
    "predict", "will i", "when will", "what will happen", "future", "guarantee",
    "exactly what will", "tell me my future",
]

def sanitize_user_text(s: str) -> str:
    s = (s or "").strip()
    s = re.sub(r"\s+", " ", s)
    return s[:1200]

def check_shared_secret(expected: str, provided: str) -> bool:
    if not expected:
        # If you forget to set it, fail closed:
        return False
    return hmac.compare_digest(expected, provided or "")

def is_out_of_scope(msg: str) -> bool:
    lower = msg.lower()
    return any(t in lower for t in BANNED_TOPICS)

def is_future_telling(msg: str) -> bool:
    lower = msg.lower()
    return any(t in lower for t in FUTURE_TELLING)

def refusal_message() -> str:
    return (
        "I can only explain **tarot card meanings** from the provided dataset.\n\n"
        "- If you tell me the **card name(s)** (and upright/reversed if relevant), I’ll interpret them symbolically.\n"
        "- I **can’t** give medical/legal/financial advice or tell you what life decision to make.\n"
        "- I **can’t** predict the future—only explain traditional meanings.\n\n"
        "Which card should we look at?"
    )
