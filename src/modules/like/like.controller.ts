import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { FetchQuery } from '../../database/base/base.interface';
import { LikeModel } from '../../database/models/like';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeService } from './like.service';

@Controller('/likes')
@ApiTags('likes')
export class LikeController {
  @Inject(LikeService)
  private likeService: LikeService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: LikeModel,
      message: 'Like Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreateLikeDto, @UserId() userId: number) {
    const like = await this.likeService.create(data, userId);

    return BaseService.transformResponse(like, 'Like Created Successfully');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: LikeModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(@Query() params: FetchQuery) {
    const Likes = await this.likeService.find(params);

    return BaseService.transformResponse(Likes, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: LikeModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const like = await this.likeService.findById(id);

    return BaseService.transformResponse(like, 'Successful');
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted Like',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.likeService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted Like',
    );
  }
}
