import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prompt: string = '';

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  moduleId: string = '';
}
