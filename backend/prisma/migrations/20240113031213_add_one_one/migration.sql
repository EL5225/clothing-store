/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Carts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Carts_user_id_key" ON "Carts"("user_id");
