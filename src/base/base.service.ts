import { HttpStatus, Injectable, Logger } from '@nestjs/common';
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
}
