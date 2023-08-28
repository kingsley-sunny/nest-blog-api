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
      Logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  async updateFile(
    url: string,
    file: Express.Multer.File,
  ): Promise<IUploadedFileResponse> {
    Logger.log('updateFile', 'FileAdapter');
    try {
      const uploadedResponse = await this.cloudinaryAdapter.updateFile(
        url,
        file,
      );

      return uploadedResponse;
    } catch (error) {
      Logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  async deleteFile(id: string): Promise<boolean> {
    Logger.log('deleteFile', 'FileAdapter');

    try {
      await this.cloudinaryAdapter.deleteFile(id);

      return true;
    } catch (error) {
      Logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }
}
