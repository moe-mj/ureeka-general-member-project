import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AskDto } from './dto/ask.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('ask')
  async askAi(@Body() askAi: AskDto) {
    return this.aiService.getResponse(askAi);
  }
}
