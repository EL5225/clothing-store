-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "address" TEXT;

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeliveryToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeliveryToProducts_AB_unique" ON "_DeliveryToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_DeliveryToProducts_B_index" ON "_DeliveryToProducts"("B");

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeliveryToProducts" ADD CONSTRAINT "_DeliveryToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeliveryToProducts" ADD CONSTRAINT "_DeliveryToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
