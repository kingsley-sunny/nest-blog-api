import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BaseModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
