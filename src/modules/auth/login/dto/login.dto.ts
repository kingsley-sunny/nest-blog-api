import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { UserModel } from '../../../../database/models/user/user.model';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    type: () => UserModel,
    isArray: true,
    name: 'email',
    example: new UserModel(),
  })
  email: string;

  @Length(5)
  password: string;
}
