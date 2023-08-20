import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserRepository],
})
export class UserModule {}
