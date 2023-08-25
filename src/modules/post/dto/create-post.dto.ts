import { IsNumber, IsString } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { CategoryRepository } from '../../category';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsNumber()
  @IsExistsIn('id', new CategoryRepository(), { message: 'Category Not found' })
  category_id: number;
}
