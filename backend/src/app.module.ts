import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LearningModule } from './learning/learning.module';
import { AiModule } from './ai/ai.module';
import { ProgressService } from './progress/progress.service';
import { ProgressController } from './progress/progress.controller';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [PrismaModule, AuthModule, LearningModule, AiModule, ProgressModule],
  controllers: [AppController, ProgressController],
  providers: [AppService, ProgressService],
})
export class AppModule {}
