import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { ConfigModule } from './config';
import { DatabaseModule } from './database/database.module';
import { UserRepository } from './database/models/user/user.repository';

@Module({
  imports: [ConfigModule, BaseModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
