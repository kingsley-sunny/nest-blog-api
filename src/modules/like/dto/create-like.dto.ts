import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { PostRepository } from '../../post';

export class CreateLikeDto {
  @IsNumber()
  @IsExistsIn('id', new PostRepository(), { message: 'Post Not found' })
  post_id: number;
}
