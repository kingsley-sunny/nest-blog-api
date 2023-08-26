import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { CommentRepository } from '../../comment';
import { UserRepository } from '../../user';

export class CreateCommentLikeDto {
  @IsNumber()
  @IsExistsIn('id', new CommentRepository(), { message: 'Comment Not found' })
  comment_id: number;

  @IsNumber()
  @IsExistsIn('id', new UserRepository(), { message: 'User Not found' })
  user_id: number;
}
