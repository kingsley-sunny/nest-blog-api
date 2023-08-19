import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { ConfigModule, EnvironmentModule } from './config';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { UserRoleModule } from './modules/user-role';

@Module({
  imports: [
    BaseModule,
    ConfigModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    UserRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
