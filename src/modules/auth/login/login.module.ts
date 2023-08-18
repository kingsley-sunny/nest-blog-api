import { Module } from '@nestjs/common';
import { UserModule } from '../../user';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UserModule],
})
export class LoginModule {}
