import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { ROLES } from '../../base/base.constant';
import { FetchQuery } from '../../database/base/base.interface';
import { UserModel } from '../../database/models/user/user.model';
import { Roles } from '../../decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Roles(ROLES.OWNER, ROLES.ADMIN)
@Controller('/users')
@ApiTags('users')
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: UserModel,
      message: 'nack',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async create(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);

    return BaseService.transformResponse(user, 'User Created Successfully');
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const users = await this.userService.find(params);

    return BaseService.transformResponse(users, 'Successful');
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const users = await this.userService.findById(id);

    return BaseService.transformResponse(users, 'Successful');
  }
}
