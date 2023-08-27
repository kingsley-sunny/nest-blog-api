import { Module } from '@nestjs/common';
import { PostImageModule } from '../post-image';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  exports: [PostService],
  providers: [PostService, PostRepository],
  imports: [PostImageModule],
})
export class PostModule {}
