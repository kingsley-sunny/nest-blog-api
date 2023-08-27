import { Module } from '@nestjs/common';
import { FileModule } from '../../adapters/file/file.module';
import { PostImageController } from './post-image.controller';
import { PostImageRepository } from './post-image.repository';
import { PostImageService } from './post-image.service';

@Module({
  controllers: [PostImageController],
  exports: [PostImageService],
  providers: [PostImageService, PostImageRepository],
  imports: [FileModule],
})
export class PostImageModule {}
