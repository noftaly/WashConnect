/*
  Warnings:

  - You are about to alter the column `priceWashing` on the `Machine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Double`.
  - You are about to alter the column `priceDrying` on the `Machine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Double`.
  - You are about to alter the column `priceWashingDrying` on the `Machine` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,2)` to `Double`.
  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Machine` MODIFY `priceWashing` DOUBLE NULL,
    MODIFY `priceDrying` DOUBLE NULL,
    MODIFY `priceWashingDrying` DOUBLE NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `balance` DOUBLE NOT NULL DEFAULT 0;
