import { Module } from '@nestjs/common';
import { CommentLikeController } from './comment-like.controller';
import { CommentLikeRepository } from './comment-like.repository';
import { CommentLikeService } from './comment-like.service';

@Module({
  controllers: [CommentLikeController],
  exports: [CommentLikeService],
  providers: [CommentLikeService, CommentLikeRepository],
})
export class CommentLikeModule {}
