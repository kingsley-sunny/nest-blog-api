import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from '../base/base.interface';

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<IResponse>> {
    const request = context.switchToHttp().getRequest();

    const path = request.url;
    const resource = request.url.split('/')[1];

    return next.handle().pipe(
      map((data) => {
        data.path = path;
        data.resource = resource;

        return data;
      }),
    );
  }
}
