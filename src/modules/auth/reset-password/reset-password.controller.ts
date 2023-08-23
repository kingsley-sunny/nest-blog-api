import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BaseService } from '../../../base';
import { ROLES } from '../../../base/base.constant';
import { FetchQuery } from '../../../database/base/base.interface';
import { Public } from '../../../decorators/public.decorator';
import { Roles } from '../../../decorators/roles.decorator';
import { CreateNewPasswordDto } from './dto/create-new-password.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth/forgot-password')
@ApiTags('auth')
export class ResetPasswordController {
  @Inject(ResetPasswordService)
  private resetPasswordService: ResetPasswordService;

  @Public()
  @Post()
  async create(@Body() data: CreateResetPasswordDto) {
    const resetPassword = await this.resetPasswordService.create(data);

    return BaseService.transformResponse(
      resetPassword,
      'A reset password link will be sent to this email if it is registered with our platform ',
    );
  }

  @Public()
  @Post('/new')
  async createNewPassword(@Body() data: CreateNewPasswordDto) {
    const user = await this.resetPasswordService.createNewPassword(data);

    return BaseService.transformResponse(
      user,
      'Your password has been updated',
    );
  }

  @Roles(ROLES.OWNER)
  @Get()
  async find(@Param() params: FetchQuery) {
    const users = await this.resetPasswordService.find(params);

    return BaseService.transformResponse(users, 'Successful');
  }

  @Roles(ROLES.OWNER)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const users = await this.resetPasswordService.findById(id);

    return BaseService.transformResponse(users, 'Successful');
  }
}
