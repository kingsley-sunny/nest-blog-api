import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { ReplyRepository } from '../../reply/reply.repository';

export class CreateReplyLikeDto {
  @IsNumber()
  @IsExistsIn('id', new ReplyRepository(), { message: 'Reply Not found' })
  reply_id: number;
}
