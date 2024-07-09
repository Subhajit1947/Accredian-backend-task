-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refereeName` VARCHAR(191) NOT NULL,
    `refereeEmail` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `course` ENUM('FRONTEND_DEVELOPMENT', 'BACKEND_DEVELOPMENT', 'FULLSTACK_DEVELOPMENT', 'DATA_SCIENTISTS', 'MACHINE_LEARNING') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Referral_refereeEmail_email_course_key`(`refereeEmail`, `email`, `course`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
