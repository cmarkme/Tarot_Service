-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingCard" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "cardKey" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReadingCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Reading_userId_idx" ON "Reading"("userId");

-- CreateIndex
CREATE INDEX "Reading_createdAt_idx" ON "Reading"("createdAt");

-- CreateIndex
CREATE INDEX "ReadingCard_readingId_idx" ON "ReadingCard"("readingId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingCard_readingId_position_key" ON "ReadingCard"("readingId", "position");

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingCard" ADD CONSTRAINT "ReadingCard_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE CASCADE ON UPDATE CASCADE;
