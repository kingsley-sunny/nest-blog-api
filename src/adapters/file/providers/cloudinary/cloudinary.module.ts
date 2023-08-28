import { Module } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { EnvironmentService } from '../../../../config';

@Module({
  providers: [
    {
      useFactory: () => {
        const cloudinaryDetails = cloudinary.config({
          cloud_name: EnvironmentService.getValue('cloudinary_name'),
          api_key: EnvironmentService.getValue('cloudinary_key'),
          api_secret: EnvironmentService.getValue('cloudinary_secret'),
        });

        return cloudinaryDetails;
      },
      provide: Symbol.for('CLOUDINARY'),
    },
  ],
})
export class CloudinaryModule {}
