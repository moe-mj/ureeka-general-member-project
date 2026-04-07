import { Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ProgressService } from './progress.service';

@ApiTags('Progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get('course/:courseId')
  async getCourseProgress(@Req() req, @Param('courseId') courseId: string) {
    const userId = req.user.userId;
    return this.progressService.getUserProgressForCourse(userId, courseId);
  }

  @Post('module/:moduleId/complete')
  async markModuleComplete(@Req() req, @Param('moduleId') moduleId: string) {
    const userId = req.user.userId;
    return this.progressService.markModuleComplete(userId, moduleId);
  }
}
