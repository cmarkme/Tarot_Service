import { NextResponse } from "next/server";
import { PrismaClient, Arcana, Suit } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// Prisma (same adapter pattern as seed)
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

// deterministic RNG helpers
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const mode = url.searchParams.get("mode") ?? "daily"; // daily | random
  const spread = url.searchParams.get("spread") ?? "one"; // one | three
  const userKey = url.searchParams.get("userKey") ?? "anon";

  const count = spread === "three" ? 3 : 1;

  const cards = await prisma.tarotCard.findMany();

  if (cards.length < count) {
    return NextResponse.json(
      { error: "Not enough cards in database" },
      { status: 400 }
    );
  }

  const seedString =
    mode === "daily"
      ? `daily:${todayISO()}:${userKey}`
      : `random:${Date.now()}`;

  const rng = mulberry32(hash(seedString));

  // pick cards without replacement
  const deck = [...cards];
  const picked = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(rng() * deck.length);
    const card = deck.splice(index, 1)[0];
    const reversed = rng() < 0.5;

    picked.push({
      slug: card.slug,
      name: card.name,
      arcana: card.arcana,
      suit: card.suit,
      number: card.number,
      reversed,
      meaning: reversed ? card.reversed : card.upright,
    });
  }

  return NextResponse.json({
    mode,
    spread,
    date: todayISO(),
    cards: picked,
  });
}
