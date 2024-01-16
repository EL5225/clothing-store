/*
  Warnings:

  - You are about to drop the `_CartsToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartsToProducts" DROP CONSTRAINT "_CartsToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartsToProducts" DROP CONSTRAINT "_CartsToProducts_B_fkey";

-- DropTable
DROP TABLE "_CartsToProducts";

-- CreateTable
CREATE TABLE "ProductsToCarts" (
    "product_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductsToCarts_pkey" PRIMARY KEY ("product_id","cart_id")
);

-- AddForeignKey
ALTER TABLE "ProductsToCarts" ADD CONSTRAINT "ProductsToCarts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsToCarts" ADD CONSTRAINT "ProductsToCarts_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
