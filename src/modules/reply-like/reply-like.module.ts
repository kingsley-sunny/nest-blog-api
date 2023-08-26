import { Module } from '@nestjs/common';
import { ReplyLikeController } from './reply-like.controller';
import { ReplyLikeRepository } from './reply-like.repository';
import { ReplyLikeService } from './reply-like.service';

@Module({
  controllers: [ReplyLikeController],
  exports: [ReplyLikeService],
  providers: [ReplyLikeService, ReplyLikeRepository],
})
export class ReplyLikeModule {}
