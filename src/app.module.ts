import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AdapterModule } from './adapters/adapter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base/base.module';
import { ConfigModule, EnvironmentModule } from './config';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category';
import { CommentModule } from './modules/comment';
import { CommentLikeModule } from './modules/comment-like';
import { LikeModule } from './modules/like';
import { PostModule } from './modules/post';
import { PostImageModule } from './modules/post-image';
import { ReplyModule } from './modules/reply';
import { ReplyLikeModule } from './modules/reply-like';
import { UserRoleModule } from './modules/user-role';

import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    BaseModule,
    ConfigModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    UserRoleModule,
    AuthModule,
    UtilsModule,
    AdapterModule,
    CategoryModule,
    PostModule,
    LikeModule,
    CommentModule,
    ReplyModule,
    CommentLikeModule,
    ReplyLikeModule,
    PostImageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
