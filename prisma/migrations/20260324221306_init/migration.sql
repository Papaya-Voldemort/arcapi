-- CreateEnum
CREATE TYPE "Pricing" AS ENUM ('Free', 'Freemium', 'Paid');

-- CreateEnum
CREATE TYPE "Auth" AS ENUM ('API_KEY', 'OAuth', 'None');

-- CreateTable
CREATE TABLE "ApiItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pricing" "Pricing" NOT NULL,
    "latency" INTEGER NOT NULL,
    "uptime" DOUBLE PRECISION NOT NULL,
    "auth" "Auth" NOT NULL,
    "endpoint" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiItem_slug_key" ON "ApiItem"("slug");
