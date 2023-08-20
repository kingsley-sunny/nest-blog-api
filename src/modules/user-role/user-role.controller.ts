import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BaseService } from '../../base';
import { FetchQuery } from '../../database/base/base.interface';
import { Public } from '../../decorators/public.decorator';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';

@Public()
@Controller('/user-roles')
export class UserRoleController {
  @Inject(UserRoleService)
  private userRoleService: UserRoleService;

  @Post()
  async create(@Body() data: CreateUserRoleDto) {
    const userRole = await this.userRoleService.create(data);

    return BaseService.transformResponse(
      userRole,
      'User Role Created Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    console.log(
      '🚀 ~~ file: user-role.controller.ts:26 ~~ UserRoleController ~~ find ~~ params:',
      params,
    );

    const userRoles = await this.userRoleService.find(params);

    return BaseService.transformResponse(
      userRoles,
      'User Role Created Successfully',
    );
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const userRoles = await this.userRoleService.findById(id);

    return BaseService.transformResponse(
      userRoles,
      'User Role Created Successfully',
    );
  }
}
