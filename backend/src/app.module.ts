import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LearningModule } from './learning/learning.module';
import { AiModule } from './ai/ai.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [PrismaModule, AuthModule, LearningModule, AiModule, ProgressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
