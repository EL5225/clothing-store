-- DropForeignKey
ALTER TABLE "Carts" DROP CONSTRAINT "Carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductsToCarts" DROP CONSTRAINT "ProductsToCarts_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductsToCarts" DROP CONSTRAINT "ProductsToCarts_product_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductsToCarts" ADD CONSTRAINT "ProductsToCarts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductsToCarts" ADD CONSTRAINT "ProductsToCarts_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
