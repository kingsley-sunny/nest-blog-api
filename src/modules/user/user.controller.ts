import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { BaseService } from '../../base';
import { FetchQuery } from '../../database/base/base.interface';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);

    return BaseService.transformResponse(user, 'User Created Successfully');
  }

  @Get()
  @Roles('Admin')
  @UseGuards(JwtAuthGuard)
  async find(params: FetchQuery) {
    const users = await this.userService.find(params);

    return BaseService.transformResponse(users, 'Successful');
  }
}
