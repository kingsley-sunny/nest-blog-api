import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { PostRepository } from '../../post/post.repository';

export class CreatePostImageDto {
  @IsNumber()
  @IsExistsIn('id', new PostRepository(), { message: 'Post Not found' })
  post_id: number;
}
