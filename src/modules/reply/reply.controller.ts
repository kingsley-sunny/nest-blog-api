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
import { ReplyModel } from '../../database/models/reply';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ReplyService } from './reply.service';

@Controller('/replies')
@ApiTags('replies')
export class ReplyController {
  @Inject(ReplyService)
  private replyService: ReplyService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: ReplyModel,
      message: 'Reply Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreateReplyDto, @UserId() userId: number) {
    const reply = await this.replyService.create(data, userId);

    return BaseService.transformResponse(reply, 'Reply Created Successfully');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: ReplyModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(
    @Query() params: FetchQuery,
    @Query('comment_id') comment_id: number,
  ) {
    const replies: any = await this.replyService.find(params, comment_id);

    return BaseService.transformResponse(replies, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: ReplyModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const reply = await this.replyService.findById(id);

    return BaseService.transformResponse(reply, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: ReplyModel,
      message: 'Successfully Updated Reply',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateReplyDto,
    @UserId() userId: number,
  ) {
    const reply = await this.replyService.update(id, data, userId);

    return BaseService.transformResponse(reply, 'Successfully Updated Reply');
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted Reply',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.replyService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted Reply',
    );
  }
}
