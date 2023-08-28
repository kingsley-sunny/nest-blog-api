import { Injectable, Logger } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { EnvironmentService } from '../../../../config';
import { IFileManagement, IUploadedFileResponse } from '../../file.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryAdapter implements IFileManagement {
  public static isActive = true;

  async uploadFile(file: Express.Multer.File): Promise<IUploadedFileResponse> {
    Logger.log('uploadFile', 'CloudinaryAdapter');

    const uploader = this.upload(file);

    const uploadedData = await uploader();

    return { url: uploadedData.secure_url, public_id: uploadedData.public_id };
  }

  private upload(file: Express.Multer.File) {
    return (): Promise<UploadApiErrorResponse | UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: EnvironmentService.getValue('cloudinary_folder'),
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }

            resolve(result);
          },
        );

        toStream(file.buffer, 50000).pipe(upload);
      });
    };
  }

  async updateFile(
    id: string,
    file: Express.Multer.File,
  ): Promise<IUploadedFileResponse> {
    Logger.log('updateFile', 'CloudinaryAdapter');

    await cloudinary.uploader.destroy(id, {
      invalidate: true,
    });

    const uploader = this.upload(file);

    const uploadedData = await uploader();

    return { url: uploadedData.secure_url, public_id: uploadedData.public_id };
  }

  async deleteFile(id: string) {
    return await cloudinary.uploader.destroy(id, {
      invalidate: true,
    });
  }
}
