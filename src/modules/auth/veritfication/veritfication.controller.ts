import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { BaseService } from '../../../base';
import { ROLES } from '../../../base/base.constant';
import { FetchQuery } from '../../../database/base/base.interface';
import { Roles } from '../../../decorators/roles.decorator';
import { UserId } from '../../../decorators/userId.decorator';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { VerificationService } from './veritfication.service';

@Roles(ROLES.OWNER, ROLES.ADMIN)
@Controller('/auth/recover')
export class VerificationController {
  @Inject(VerificationService)
  private verificationService: VerificationService;

  @Post()
  async create(@Body() data: CreateVerificationDto, @UserId() userId: number) {
    const verification = await this.verificationService.create(data, userId);

    return BaseService.transformResponse(
      verification,
      'A Code have been sent to your email',
    );
  }

  @Roles(ROLES.OWNER)
  @Get()
  async find(@Param() params: FetchQuery) {
    const users = await this.verificationService.find(params);

    return BaseService.transformResponse(users, 'Successful');
  }

  @Roles(ROLES.OWNER)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const users = await this.verificationService.findById(id);

    return BaseService.transformResponse(users, 'Successful');
  }
}
