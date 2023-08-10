import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { EnvironmentService } from './config/environment/environment.service';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { ResponseInterceptor } from './interceptors/response-interceptor';

dotenv.config();

class Server {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    app.enableCors();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(EnvironmentService.getValue('appPort'));
    console.log('Stared Server on port 8080');
  }
}

Server.bootstrap();
