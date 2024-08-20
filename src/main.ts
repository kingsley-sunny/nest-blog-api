import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './config/environment/environment.service';
import { HttpExceptionFilter } from './exceptions/http-exception';
import { ResponseInterceptor } from './interceptors/response-interceptor';

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import metadata from './metadata'; // <-- file auto-generated by the "PluginMetadataGenerator"

class Server {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule, { snapshot: true });
    app.enableCors();
    Server.addMiddleware(app);

    // app.setGlobalPrefix('/api');

    const documentation = await Server.configureSwagger(app);

    Server.createAPIDocumentationFolder(documentation);

    await app.listen(EnvironmentService.getValue('appPort'));

    console.log('Stared Server on port 8080');
  }

  static addMiddleware(app: INestApplication) {
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  }

  static async configureSwagger(app: INestApplication) {
    Logger.log('configureSwagger', 'Main.ts');

    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Blog API')
      .setDescription(
        'An Api endpoints for a full functional Blog app (Personal Project)',
      )
      .setVersion('1.0')
      .addTag('blog')
      .build();

    await SwaggerModule.loadPluginMetadata(metadata);

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    return document;
  }

  static async createAPIDocumentationFolder(document: OpenAPIObject) {
    const file = writeFile('open-api.json', JSON.stringify(document));

    return file;
  }
}

Server.bootstrap();
