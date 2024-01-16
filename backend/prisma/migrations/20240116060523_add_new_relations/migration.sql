/*
  Warnings:

  - You are about to drop the column `delivery_id` on the `ProductsToCarts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductsToCarts" DROP CONSTRAINT "ProductsToCarts_delivery_id_fkey";

-- AlterTable
ALTER TABLE "ProductsToCarts" DROP COLUMN "delivery_id";
