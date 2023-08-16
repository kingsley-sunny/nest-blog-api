import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { ConfigModule, EnvironmentModule } from './config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules';

@Module({
  imports: [
    BaseModule,
    ConfigModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
