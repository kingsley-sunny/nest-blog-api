import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  exports: [LikeService],
  providers: [LikeService, LikeRepository],
})
export class PostModule {}
