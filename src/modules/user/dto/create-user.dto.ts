import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @Length(8)
  password: string;
}
