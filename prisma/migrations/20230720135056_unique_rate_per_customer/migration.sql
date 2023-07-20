/*
  Warnings:

  - A unique constraint covering the columns `[customer_id]` on the table `rates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rates_customer_id_key" ON "rates"("customer_id");
