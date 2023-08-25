import { IsNumber, IsString } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { PostRepository } from '../../post';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsNumber()
  @IsExistsIn('id', new PostRepository(), { message: 'Post Not found' })
  post_id: number;
}
