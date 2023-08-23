import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BaseService } from '../../../base';
import { Public } from '../../../decorators/public.decorator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { SignUpService } from './signup.service';
import { ApiTags } from '@nestjs/swagger';

@Public()
@Controller('auth/signup')
@ApiTags('auth')
export class SignUpController {
  @Inject(SignUpService)
  signUpService: SignUpService;

  @Post()
  async create(@Body() data: CreateUserDto) {
    console.log(data);
    const user = await this.signUpService.create(data);

    return BaseService.transformResponse(user, 'Successful Created User');
  }
}
