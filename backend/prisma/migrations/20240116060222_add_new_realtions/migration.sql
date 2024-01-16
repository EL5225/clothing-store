/*
  Warnings:

  - You are about to drop the column `is_checkout` on the `ProductsToCarts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductsToCarts" DROP COLUMN "is_checkout";

-- CreateTable
CREATE TABLE "DeliveryProducts" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "delivery_id" TEXT,

    CONSTRAINT "DeliveryProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeliveryProductsToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeliveryProductsToProducts_AB_unique" ON "_DeliveryProductsToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_DeliveryProductsToProducts_B_index" ON "_DeliveryProductsToProducts"("B");

-- AddForeignKey
ALTER TABLE "DeliveryProducts" ADD CONSTRAINT "DeliveryProducts_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeliveryProductsToProducts" ADD CONSTRAINT "_DeliveryProductsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "DeliveryProducts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeliveryProductsToProducts" ADD CONSTRAINT "_DeliveryProductsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
