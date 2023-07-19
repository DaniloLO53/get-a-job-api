/*
  Warnings:

  - You are about to drop the column `description` on the `location_services` table. All the data in the column will be lost.
  - You are about to drop the column `max_price` on the `location_services` table. All the data in the column will be lost.
  - You are about to drop the column `min_price` on the `location_services` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `location_services` table. All the data in the column will be lost.
  - Added the required column `city` to the `location_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `location_services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `location_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location_services" DROP COLUMN "description",
DROP COLUMN "max_price",
DROP COLUMN "min_price",
DROP COLUMN "title",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
