-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "job_provider_id" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "commentary" TEXT,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_job_provider_id_fkey" FOREIGN KEY ("job_provider_id") REFERENCES "job_providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
