import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { IResponse } from './base.interface';

@Injectable()
export class BaseService {
  public static async transformResponse(
    data: Record<any, any> | Promise<Record<any, any>>,
    message: string,
    statusCode: number = HttpStatus.OK,
  ): Promise<IResponse> {
    const finalData = await data;
    const dateTime = new Date().toISOString();
    Logger.log('transformResponse', 'BaseService');

    return {
      data: finalData,
      message,
      statusCode,
      timestamp: dateTime,
    };
  }

  public static validateMulterFile(
    size?: number,
    type?: string,
  ): MulterOptions {
    return {
      limits: { fileSize: size || 2_000_000 },
      fileFilter(req, file, callback) {
        if (!file.mimetype.includes(type || 'image')) {
          const error = new InternalServerErrorException(
            'File should be only image type',
          );
          callback(error, false);
        }

        callback(null, true);
      },
    };
  }
}
