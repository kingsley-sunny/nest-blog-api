import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @Length(5)
  password: string;
}
