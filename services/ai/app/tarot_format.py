import json
import re
from typing import Any

def build_context_block(cards_ctx: Any) -> str:
    # Accept dict keyed by id or list of card objects; stringify safely
    return json.dumps(cards_ctx, ensure_ascii=False, indent=2)[:12000]

def post_format_hardening(text: str) -> str:
    # Enforce max 2 reflection prompts if the model gets chatty
    # (lightweight heuristic)
    lines = text.splitlines()
    out = []
    in_ref = False
    q_count = 0
    for ln in lines:
        if ln.lower().startswith("reflection prompts"):
            in_ref = True
            out.append(ln)
            continue
        if in_ref and ("?" in ln):
            # count questions
            q_count += ln.count("?")
            if q_count > 2:
                continue
        out.append(ln)
    cleaned = "\n".join(out).strip()
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned
