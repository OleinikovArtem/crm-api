/*
  Warnings:

  - Added the required column `email` to the `BillingInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillingInfo" ADD COLUMN     "email" TEXT NOT NULL;
