import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { ResponseInterceptor } from './interceptors/response-interceptor';

class Server {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    app.enableCors();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(8080);
    console.log('Stared Server on port 8080');
  }
}

Server.bootstrap();
