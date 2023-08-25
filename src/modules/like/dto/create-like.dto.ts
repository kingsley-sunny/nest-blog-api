import { IsNumber } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { LikeRepository } from '../like.repository';

export class CreateLikeDto {
  @IsNumber()
  @IsExistsIn('id', new LikeRepository(), { message: 'Post Not found' })
  post_id: number;
}
