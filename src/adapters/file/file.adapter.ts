import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProviderInjector } from '../../helpers/injectors/ProviderInjector';
import { IFileManagement, IUploadedFileResponse } from './file.interface';
import { CloudinaryAdapter } from './providers/cloudinary/cloudinary.adapter';

@Injectable()
export class FileAdapter implements IFileManagement {
  @Inject(ProviderInjector.inject([CloudinaryAdapter], CloudinaryAdapter))
  cloudinaryAdapter: CloudinaryAdapter;

  async uploadFile(file: Express.Multer.File): Promise<IUploadedFileResponse> {
    Logger.log('uploadFile', 'FileAdapter');
    try {
      const uploadedResponse = await this.cloudinaryAdapter.uploadFile(file);

      return uploadedResponse;
    } catch (error) {
      Logger.error(error.message);

      throw new InternalServerErrorException(
        'Something went wrong with uploading the image',
      );
    }
  }
}
