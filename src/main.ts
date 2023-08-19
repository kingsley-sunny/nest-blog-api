import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './config/environment/environment.service';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { ResponseInterceptor } from './interceptors/response-interceptor';

import { ValidationPipe } from '@nestjs/common';
import * as env from 'dotenv';

env.config();

class Server {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    app.enableCors();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalGuards(new RolesGuard(new Reflector()));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.listen(EnvironmentService.getValue('appPort'));
    console.log('Stared Server on port 8080');
  }
}

Server.bootstrap();
