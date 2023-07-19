/*
  Warnings:

  - You are about to drop the column `job_provider_id` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_provider_id` on the `rates` table. All the data in the column will be lost.
  - You are about to drop the `job_providers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `worker_id` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worker_id` to the `rates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_job_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "rates" DROP CONSTRAINT "rates_job_provider_id_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "job_provider_id",
ADD COLUMN     "worker_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rates" DROP COLUMN "job_provider_id",
ADD COLUMN     "worker_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "job_providers";

-- CreateTable
CREATE TABLE "workers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "workers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "workers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
