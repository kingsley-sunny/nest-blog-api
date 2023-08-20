import { Module } from '@nestjs/common';
import { EmailAdapter } from './email.adapter';
import { ResendAdapter } from './providers/resend/resend.adapter';

@Module({
  providers: [ResendAdapter, EmailAdapter],
  exports: [EmailAdapter, ResendAdapter],
})
export class EmailModule {}
