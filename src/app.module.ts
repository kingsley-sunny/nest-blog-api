import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { DatabaseModule } from './database/database.module';
import { UserRepository } from './database/models/user/user.repository';

@Module({
  imports: [BaseModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
