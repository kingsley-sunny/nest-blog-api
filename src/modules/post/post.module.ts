import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  exports: [PostService],
  providers: [PostService, PostRepository],
})
export class PostModule {}
