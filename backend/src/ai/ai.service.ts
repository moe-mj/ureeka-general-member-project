import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AskDto } from './dto/ask.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private ai: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private readonly prisma: PrismaService) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('No Gemini API Key');
    }
    this.ai = new GoogleGenerativeAI(apiKey);
    this.model = this.ai.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });
  }
  async getResponse(data: AskDto) {
    const { prompt, moduleId } = data;
    const moduleData = (await this.prisma.module.findUnique({
      where: { id: moduleId },
      select: { content: true },
    })) as { content: string } | null;

    if (!moduleData) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    const chatSession = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a tutor for students in AcelAcademy' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: `
                Rules:
                1. Don't give a direct answer to user
                2. Gives a questions to help user develop or you could give an analogy
                3. Use LaTeX for mathematical expression, for example ($E=mc^2$)
                4. Use this context for this material: ${moduleData.content}`,
            },
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  }
}
