-- CreateEnum
CREATE TYPE "Arcana" AS ENUM ('MAJOR', 'MINOR');

-- CreateEnum
CREATE TYPE "Suit" AS ENUM ('WANDS', 'CUPS', 'SWORDS', 'PENTACLES');

-- CreateEnum
CREATE TYPE "ReadingMode" AS ENUM ('RANDOM', 'DAILY');

-- CreateEnum
CREATE TYPE "SpreadType" AS ENUM ('SINGLE', 'THREE_CARD');

-- CreateTable
CREATE TABLE "TarotCard" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arcana" "Arcana" NOT NULL,
    "suit" "Suit",
    "number" INTEGER,
    "keywords" TEXT[],
    "upright" TEXT NOT NULL,
    "reversed" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TarotCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TarotReading" (
    "id" TEXT NOT NULL,
    "mode" "ReadingMode" NOT NULL,
    "spread" "SpreadType" NOT NULL,
    "seedKey" TEXT,
    "cards" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TarotReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TarotDraw" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "spread" "SpreadType" NOT NULL,
    "seedKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TarotDraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TarotCard_slug_key" ON "TarotCard"("slug");

-- CreateIndex
CREATE INDEX "TarotDraw_seedKey_idx" ON "TarotDraw"("seedKey");
