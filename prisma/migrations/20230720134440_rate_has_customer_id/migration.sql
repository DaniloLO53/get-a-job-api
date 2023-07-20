-- AlterTable
ALTER TABLE "rates" ADD COLUMN     "customer_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
