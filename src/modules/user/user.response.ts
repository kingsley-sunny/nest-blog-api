import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../../database/models/user/user.interface';
import { UserModel } from '../../database/models/user/user.model';

export class UserResponse {
  @ApiProperty({ type: UserModel, example: { ...new UserModel().toJSON() } })
  user: IUser;
}
