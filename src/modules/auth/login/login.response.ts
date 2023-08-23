import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../../../database/models/user/user.model';

export class LoginResponse {
  @ApiProperty({ type: UserModel })
  data: UserModel;

  @ApiProperty()
  accessToken: string;
}
