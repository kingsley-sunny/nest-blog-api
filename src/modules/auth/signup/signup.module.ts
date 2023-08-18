import { Module } from '@nestjs/common';
import { UserModule } from '../../user';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [UserModule],
})
export class SignUpModule {}
