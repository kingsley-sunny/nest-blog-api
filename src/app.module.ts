import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { ConfigModule, EnvironmentModule } from './config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules';
import { UserRoleModule } from './modules/user-role';

@Module({
  imports: [
    BaseModule,
    ConfigModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
