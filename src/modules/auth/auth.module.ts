import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { SignUpModule } from './signup';

@Module({
  providers: [SignUpModule, AuthService],
  exports: [SignUpModule],
  imports: [UserModule],
})
export class AuthModule {}
