import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EmailAdapter } from '../../../adapters/email/email.adapter';
import { BaseService } from '../../../base';
import { BaseApiResponse } from '../../../base/base-api-response';
import { Public } from '../../../decorators/public.decorator';
import { LoginDto } from './dto';
import { LoginResponse } from './login.response';
import { LoginService } from './login.service';

@Public()
@UseGuards(AuthGuard('local'))
@Controller('auth/login')
@ApiTags('auth')
export class LoginController {
  @Inject(LoginService)
  loginService: LoginService;
  @Inject(EmailAdapter)
  emailAdapter: EmailAdapter;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: LoginResponse,
      message: 'User Successfully logged in',
      statusCode: 201,
    }),
  })
  async create(@Body() data: LoginDto, @Request() req: Request) {
    const user = await this.loginService.create((req as any).user);

    return BaseService.transformResponse(user, 'User Successfully logged in');
  }
}
