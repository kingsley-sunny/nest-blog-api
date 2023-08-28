import { IsNumber, IsString } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { CommentRepository } from '../../comment';
import { UserRepository } from '../../user';

export class CreateReplyDto {
  @IsString()
  text: string;

  @IsNumber()
  @IsExistsIn('id', new CommentRepository(), { message: 'Comment Not found' })
  comment_id: number;

  @IsNumber()
  @IsExistsIn('id', new UserRepository(), { message: 'User Not found' })
  recipient_id: number;
}
