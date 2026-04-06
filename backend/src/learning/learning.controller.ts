import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LearningService } from './learning.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard'; // Sesuaikan path-nya jika beda folder
import { CreateLearningDto } from './dto/learning.dto'; // Import DTO dari file terpisah

@ApiTags('Learning')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get()
  getAllCourses() {
    return this.learningService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.learningService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() body: CreateLearningDto) {
    return this.learningService.createCourse(body);
  }

  @Get(':courseId/modules')
  getModulesByCourseId(@Param('courseId') courseId: string) {
    return this.learningService.getModulesByCourseId(courseId);
  }

  @Get('module/:moduleId')
  getModuleById(@Param('moduleId') moduleId: string) {
    return this.learningService.getModuleById(moduleId);
  }
}