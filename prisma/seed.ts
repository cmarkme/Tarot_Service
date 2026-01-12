import "dotenv/config";
import { PrismaClient, Arcana, Suit } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const cards = [
  {
    slug: "the-fool",
    name: "The Fool",
    arcana: Arcana.MAJOR,
    suit: null,
    number: 0,
    upright: "Beginnings, spontaneity, trust, a leap of faith.",
    reversed: "Recklessness, naivety, poor judgment, holding back.",
    keywords: ["beginnings", "freedom", "leap of faith"],
    imageUrl: null,
  },
  {
    slug: "the-magician",
    name: "The Magician",
    arcana: Arcana.MAJOR,
    suit: null,
    number: 1,
    upright: "Manifestation, skill, focus, turning ideas into action.",
    reversed: "Manipulation, scattered energy, unused potential.",
    keywords: ["focus", "skill", "manifestation"],
    imageUrl: null,
  },
  {
    slug: "ace-of-cups",
    name: "Ace of Cups",
    arcana: Arcana.MINOR,
    suit: Suit.CUPS,
    number: 1,
    upright: "New feelings, emotional renewal, open heart.",
    reversed: "Blocked emotions, emptiness, self-protection.",
    keywords: ["love", "emotion", "renewal"],
    imageUrl: null,
  },
  {
    slug: "ace-of-wands",
    name: "Ace of Wands",
    arcana: Arcana.MINOR,
    suit: Suit.WANDS,
    number: 1,
    upright: "Inspiration, ignition, creative spark, new venture.",
    reversed: "Delays, low energy, lack of direction.",
    keywords: ["inspiration", "spark", "new venture"],
    imageUrl: null,
  },
];

async function main() {
  for (const card of cards) {
    await prisma.tarotCard.upsert({
      where: { slug: card.slug },
      update: card,
      create: card,
    });
  }

  const count = await prisma.tarotCard.count();
  console.log(`✅ Seed complete. Total TarotCard rows: ${count}`);
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
