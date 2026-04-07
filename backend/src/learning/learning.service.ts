import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LearningService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses() {
    return await this.prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCourseById(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(
        `Course dengan ID ${courseId} nggak ditemukan!`,
      );
    }

    return course;
  }

  async createCourse(data: { id: string; title: string; description: string }) {
    const { id, title, description } = data;

    const existingCourse = await this.prisma.course.findUnique({
      where: { id },
    });

    if (existingCourse) {
      throw new BadRequestException(`Course dengan ID ${id} udah ada!`);
    }

    const newCourse = await this.prisma.course.create({
      data: {
        id,
        title,
        description,
      },
    });

    return newCourse;
  }

  async getModulesByCourseId(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(
        `Course dengan ID ${courseId} nggak ditemukan!`,
      );
    }

    return await this.prisma.module.findMany({
      where: { courseId: courseId },
      orderBy: { order: 'asc' },
    });
  }

  async getModuleById(moduleId: string) {
    const moduleItem = await this.prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!moduleItem) {
      throw new NotFoundException(
        `Modul dengan ID ${moduleId} nggak ditemukan!`,
      );
    }

    return moduleItem;
  }
}
