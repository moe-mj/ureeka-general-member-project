import { ApiProperty } from '@nestjs/swagger';

export class UserProgressDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  userId: string = '';

  @ApiProperty()
  moduleId: string = '';

  @ApiProperty()
  isCompleted: boolean = false;
}

export class MarkCompleteResponseDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  userId: string = '';

  @ApiProperty()
  moduleId: string = '';

  @ApiProperty()
  isCompleted: boolean = false;
}

export class CourseProgressResponseDto {
  @ApiProperty()
  progress: UserProgressDto[] = [];
}
