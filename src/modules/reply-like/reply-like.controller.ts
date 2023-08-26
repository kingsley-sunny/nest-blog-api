import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
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
import { ReplyLikeModel } from '../../database/models/replyLIke';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CreateReplyLikeDto } from './dto/create-reply-like.dto';
import { ReplyLikeService } from './reply-like.service';

@Controller('/reply-likes')
@ApiTags('reply-likes')
export class ReplyLikeController {
  @Inject(ReplyLikeService)
  private replyLikeService: ReplyLikeService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: ReplyLikeModel,
      message: 'ReplyLike Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreateReplyLikeDto, @UserId() userId: number) {
    const replyLike = await this.replyLikeService.create(data, userId);

    return BaseService.transformResponse(
      replyLike,
      'ReplyLike Created Successfully',
    );
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: ReplyLikeModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(@Query() params: FetchQuery, @Query('reply_id') reply_id: number) {
    const replyLikes: any = await this.replyLikeService.find(params, reply_id);

    return BaseService.transformResponse(replyLikes, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: ReplyLikeModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const replyLike = await this.replyLikeService.findById(id);

    return BaseService.transformResponse(replyLike, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: ReplyLikeModel,
      message: 'Successfully Updated ReplyLike',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateReplyLikeDto,
    @UserId() userId: number,
  ) {
    const replyLike = await this.replyLikeService.update(id, data, userId);

    return BaseService.transformResponse(
      replyLike,
      'Successfully Updated ReplyLike',
    );
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted ReplyLike',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.replyLikeService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted ReplyLike',
    );
  }
}
