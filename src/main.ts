import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './config/environment/environment.service';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { ResponseInterceptor } from './interceptors/response-interceptor';

import * as env from 'dotenv';
import { RolesGuard } from './guards/roles.guard';

env.config();

class Server {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    app.enableCors();
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalGuards(new RolesGuard(new Reflector()));

    await app.listen(EnvironmentService.getValue('appPort'));
    console.log('Stared Server on port 8080');
  }
}

Server.bootstrap();
