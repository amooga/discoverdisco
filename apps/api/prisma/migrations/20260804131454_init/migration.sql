/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pincode` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Business_phone_key" ON "Business"("phone");
