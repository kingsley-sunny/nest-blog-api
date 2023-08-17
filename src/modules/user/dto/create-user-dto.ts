import { IsArray, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsString()
  user_name: string;

  @IsEmail()
  email: string;

  @Length(5)
  password: string;

  @IsArray()
  user_roles: any[];
}
