import { ALL_CARDS } from "@/data/tarotCards";
import { TAROT_MEANINGS } from "@/data/tarotMeanings";

export type CardKey = keyof typeof TAROT_MEANINGS;

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function findMentionedCards(message: string): CardKey[] {
  const msg = normalize(message);

  const matches: CardKey[] = [];
  for (const card of ALL_CARDS) {
    const id = card.id as CardKey;
    const nameNorm = normalize(card.name);
    const idNorm = normalize(card.id);
    if (msg.includes(nameNorm) || msg.includes(idNorm)) matches.push(id);
  }

  return Array.from(new Set(matches))
    .filter((key) => key in TAROT_MEANINGS)
    .slice(0, 3); // keep it small
}

export function pickMeaningsSubset(cardKeys: CardKey[]) {
  const subset: Record<string, any> = {};
  for (const k of cardKeys) subset[k] = TAROT_MEANINGS[k];
  return subset;
}

