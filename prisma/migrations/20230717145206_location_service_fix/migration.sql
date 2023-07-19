/*
  Warnings:

  - You are about to drop the column `service_id` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the `location_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `job_id` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "location_services" DROP CONSTRAINT "location_services_service_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_service_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_service_provider_id_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "service_id",
ADD COLUMN     "job_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "location_services";

-- DropTable
DROP TABLE "service_providers";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "job_provider_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "min_price" TEXT,
    "max_price" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_jobs" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_providers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_providers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_providers_email_key" ON "job_providers"("email");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_provider_id_fkey" FOREIGN KEY ("job_provider_id") REFERENCES "job_providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_jobs" ADD CONSTRAINT "location_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
