import rawMeanings from "../../services/ai/data/tarotMeanings.json";

export type TarotMeaning = {
  upright: string;
  reversed: string;
  keywords: string[];
  past: string;
  present: string;
  future: string;
  combined: string;
  deep: string;
};

export const TAROT_MEANINGS = rawMeanings as Record<string, TarotMeaning>;
