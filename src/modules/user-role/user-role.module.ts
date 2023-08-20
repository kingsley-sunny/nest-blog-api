import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleRepository } from './user-role.repository';
import { UserRoleService } from './user-role.service';

@Module({
  controllers: [UserRoleController],
  exports: [UserRoleService],
  providers: [UserRoleService, UserRoleRepository],
})
export class UserRoleModule {}
