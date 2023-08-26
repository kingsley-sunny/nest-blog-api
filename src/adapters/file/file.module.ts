import { Module } from '@nestjs/common';
import { FileAdapter } from './file.adapter';
import { CloudinaryAdapter } from './providers/cloudinary/cloudinary.adapter';

@Module({
  providers: [CloudinaryAdapter, FileAdapter],
  exports: [FileAdapter, CloudinaryAdapter],
})
export class FileModule {}
