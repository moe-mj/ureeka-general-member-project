/*
  Warnings:

  - You are about to drop the column `photoprofile` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `photoprofile`,
    MODIFY `name` VARCHAR(191) NULL;
