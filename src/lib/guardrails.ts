const OUT_OF_SCOPE = [
  "medical", "diagnos", "treatment", "medication", "doctor",
  "legal", "lawsuit", "attorney", "contract",
  "financial advice", "invest", "stock", "crypto", "forex", "loan", "debt",
  "should i", "tell me what to do", "make a decision",
];

const FUTURE = [
  "predict",
  "what will happen",
  "guarantee",
  "tell me my future",
  "when will i",
];

export function isOutOfScope(msg: string) {
  const m = msg.toLowerCase();
  return OUT_OF_SCOPE.some((t) => m.includes(t));
}

export function isFutureTelling(msg: string) {
  const m = msg.toLowerCase();
  return FUTURE.some((t) => m.includes(t));
}

export function refusal() {
  return (
    "I can only explain **tarot card meanings** (symbolic interpretations) from the dataset.\n\n" +
    "- I can’t give medical/legal/financial advice or tell you what decision to make.\n" +
    "- I can’t predict the future.\n\n" +
    "Tell me a **card name** (example: “The Fool upright”) and I’ll explain its meaning."
  );
}
