import { IsString, IsUUID } from 'class-validator';

export class CreateNewPasswordDto {
  @IsUUID()
  unique_id: string;

  @IsString()
  password: string;
}
