import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  exports: [CommentService],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
