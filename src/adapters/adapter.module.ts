import { Module } from '@nestjs/common';
import { EmailAdapter } from './email/email.adapter';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule],
  providers: [EmailAdapter],
})
export class AdapterModule {}
