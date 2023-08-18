import { Module } from '@nestjs/common';
import { SignUpModule } from './signup';

@Module({
  providers: [SignUpModule],
  exports: [SignUpModule],
})
export class AuthModule {}
