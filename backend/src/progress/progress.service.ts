import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getUserProgressForCourse(userId: number, courseId: string) {
    const modules = await this.prisma.module.findMany({
      where: { courseId },
      select: { id: true },
    });
    const moduleIds = modules.map((m) => m.id);
    return this.prisma.userProgress.findMany({
      where: {
        userId: String(userId),
        moduleId: { in: moduleIds },
      },
    });
  }

  async markModuleComplete(userId: number, moduleId: string) {
    return this.prisma.userProgress.upsert({
      where: {
        userId_moduleId: { userId: String(userId), moduleId },
      },
      update: { isCompleted: true },
      create: { userId: String(userId), moduleId, isCompleted: true },
    });
  }
}
