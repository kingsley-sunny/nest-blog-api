import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseService } from '../../../base';
import { LoginDto } from './dto';
import { LoginService } from './login.service';

@Controller('auth/login')
export class LoginController {
  @Inject(LoginService)
  loginService: LoginService;

  @UseGuards(AuthGuard('local'))
  @Post()
  async create(@Body() data: LoginDto, @Request() req: Request) {
    const user = await this.loginService.create((req as any).user);

    return BaseService.transformResponse(user, 'User Successfully logged in');
  }
}
