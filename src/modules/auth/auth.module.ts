import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../../adapters/email/email.module';
import { EnvironmentService } from '../../config';
import { UserModule, UserRepository } from '../user';
import { AuthService } from './auth.service';
import { LoginController, LoginModule, LoginService } from './login';
import { SignUpController, SignUpModule, SignUpService } from './signup';
import { JwtStrategy } from './strategies/jwt.strategy.service';
import { LocalStrategy } from './strategies/local.strategy';
import {
  VerificationController,
  VerificationRepository,
  VerificationService,
} from './veritfication';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: EnvironmentService.getValue('jwtSecretToken'),
      signOptions: { expiresIn: '2days' },
    }),
    EmailModule,
  ],
  providers: [
    SignUpModule,
    AuthService,
    LoginModule,
    LocalStrategy,
    LoginService,
    SignUpService,
    JwtStrategy,
    UserRepository,
    VerificationService,
    VerificationRepository,
  ],
  controllers: [LoginController, SignUpController, VerificationController],
})
export class AuthModule {}
