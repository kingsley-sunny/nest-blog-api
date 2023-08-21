import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordRepository } from './reset-password.repository';
import { ResetPasswordService } from './reset-password.service';

@Module({
  controllers: [ResetPasswordController],
  exports: [ResetPasswordService],
  providers: [ResetPasswordService, ResetPasswordRepository],
})
export class ResetPasswordModule {}
