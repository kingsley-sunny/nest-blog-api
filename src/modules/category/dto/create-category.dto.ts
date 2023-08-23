import { IsString, Max } from 'class-validator';

export class CreateCategoryDto {
  @Max(24)
  @IsString()
  name: string;
}
