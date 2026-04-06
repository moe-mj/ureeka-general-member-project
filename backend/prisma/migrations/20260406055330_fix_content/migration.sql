/*
  Warnings:

  - You are about to drop the column `conten` on the `module` table. All the data in the column will be lost.
  - Added the required column `content` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `module` DROP COLUMN `conten`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;
