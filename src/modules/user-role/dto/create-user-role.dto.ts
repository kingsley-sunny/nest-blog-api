import { IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  user_id: number;

  @IsString()
  role_id: number;
}
