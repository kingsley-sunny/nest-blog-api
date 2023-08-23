import { IsEmail } from 'class-validator';

export class CreateResetPasswordDto {
  @IsEmail()
  email: string;
}
