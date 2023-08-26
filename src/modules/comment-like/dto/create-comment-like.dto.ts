import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { CommentRepository } from '../../comment';

export class CreateCommentLikeDto {
  @IsNumber()
  @IsExistsIn('id', new CommentRepository(), { message: 'Comment Not found' })
  comment_id: number;
}
