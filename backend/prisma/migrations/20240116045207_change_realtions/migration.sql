/*
  Warnings:

  - You are about to drop the `_DeliveryToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_DeliveryToProducts" DROP CONSTRAINT "_DeliveryToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeliveryToProducts" DROP CONSTRAINT "_DeliveryToProducts_B_fkey";

-- AlterTable
ALTER TABLE "ProductsToCarts" ADD COLUMN     "delivery_id" TEXT;

-- DropTable
DROP TABLE "_DeliveryToProducts";

-- AddForeignKey
ALTER TABLE "ProductsToCarts" ADD CONSTRAINT "ProductsToCarts_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
