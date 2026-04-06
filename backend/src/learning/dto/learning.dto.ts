import { ApiProperty } from '@nestjs/swagger';

export class CreateLearningDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}