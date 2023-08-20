import { Module } from '@nestjs/common';
import { VerificationController } from './veritfication.controller';
import { VerificationRepository } from './veritfication.repository';
import { VerificationService } from './veritfication.service';

@Module({
  controllers: [VerificationController],
  exports: [VerificationService],
  providers: [VerificationService, VerificationRepository],
})
export class VerificationModule {}
