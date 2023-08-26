import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { ReplyRepository } from '../../reply/reply.repository';
import { UserRepository } from '../../user';

export class CreateReplyLikeDto {
  @IsNumber()
  @IsExistsIn('id', new ReplyRepository(), { message: 'Reply Not found' })
  reply_id: number;

  @IsNumber()
  @IsExistsIn('id', new UserRepository(), { message: 'User Not found' })
  user_id: number;
}
