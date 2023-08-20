import { IsEmail } from 'class-validator';
import { IsExistsIn } from '../../../../decorators/IsExistsIn.decorator';
import { UserRepository } from '../../../user';

export class CreateVerificationDto {
  @IsEmail()
  @IsExistsIn('email', new UserRepository(), {
    message: 'No user Found with this email',
  })
  email: string;
}
