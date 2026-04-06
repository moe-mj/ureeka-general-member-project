import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AskDto } from './dto/ask.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post('ask')
//   async askAi(@Body() askAi: AskDto) {
//     const response = await this.aiService.getResponse(askAi);
//     return this.aiService.getResponse(response);
//   }
}
