/*
  Warnings:

  - You are about to alter the column `grand_total` on the `Carts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `price` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Carts" ALTER COLUMN "grand_total" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "price" SET DATA TYPE INTEGER;
