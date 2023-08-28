import { Module } from '@nestjs/common';
import { FileAdapter } from './file.adapter';
import { CloudinaryAdapter } from './providers/cloudinary/cloudinary.adapter';
import { CloudinaryModule } from './providers/cloudinary/cloudinary.module';

@Module({
  providers: [CloudinaryAdapter, FileAdapter],
  exports: [FileAdapter, CloudinaryAdapter],
  imports: [CloudinaryModule],
})
export class FileModule {}
