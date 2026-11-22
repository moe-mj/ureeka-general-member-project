import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [PrismaModule],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
