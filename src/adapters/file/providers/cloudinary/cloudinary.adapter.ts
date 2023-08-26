import { Injectable, Logger } from '@nestjs/common';
import toStream from 'buffer-to-stream';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { IFileManagement, IUploadedFileResponse } from '../../file.interface';

@Injectable()
export class CloudinaryAdapter implements IFileManagement {
  public static isActive = true;

  async uploadFile(file: Express.Multer.File): Promise<IUploadedFileResponse> {
    Logger.log('uploadFile', 'CloudinaryAdapter');
    const uploader = (): Promise<
      UploadApiErrorResponse | UploadApiResponse
    > => {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream((err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        });

        toStream(file.buffer).pipe(upload);
      });
    };

    const uploadedData = await uploader();

    return { url: uploadedData.secure_url };
  }
}
