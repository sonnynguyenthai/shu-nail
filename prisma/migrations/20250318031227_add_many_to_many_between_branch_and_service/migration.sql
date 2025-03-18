/*
  Warnings:

  - You are about to drop the column `branchId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_branchId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "branchId";

-- CreateTable
CREATE TABLE "BranchService" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BranchService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BranchService_branchId_serviceId_key" ON "BranchService"("branchId", "serviceId");

-- AddForeignKey
ALTER TABLE "BranchService" ADD CONSTRAINT "BranchService_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchService" ADD CONSTRAINT "BranchService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
