import { Module } from '@nestjs/common';
import { EmailAdapter } from './email/email.adapter';
import { EmailModule } from './email/email.module';
import { FileAdapter } from './file/file.adapter';
import { FileModule } from './file/file.module';

@Module({
  imports: [EmailModule, FileModule],
  providers: [EmailAdapter, FileAdapter],
})
export class AdapterModule {}
