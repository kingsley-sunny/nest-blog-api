import { Transform } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { CategoryRepository } from '../../category';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @Transform((value) => Number(value.value))
  @IsNumber()
  @IsExistsIn('id', new CategoryRepository(), { message: 'Category Not found' })
  category_id: number;

  @IsObject()
  @IsOptional()
  file: Express.Multer.File;
}
