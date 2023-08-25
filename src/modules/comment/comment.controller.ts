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
import { CommentModel } from '../../database/models/comment';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('/comments')
@ApiTags('comments')
export class CommentController {
  @Inject(CommentService)
  private commentService: CommentService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: CommentModel,
      message: 'Comment Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreateCommentDto, @UserId() userId: number) {
    const comment = await this.commentService.create(data, userId);

    return BaseService.transformResponse(
      comment,
      'Comment Created Successfully',
    );
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: CommentModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(@Query() params: FetchQuery, @Query('post_id') post_id: number) {
    const comments: any = await this.commentService.find(params, post_id);

    return BaseService.transformResponse(comments, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: CommentModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const comment = await this.commentService.findById(id);

    return BaseService.transformResponse(comment, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: CommentModel,
      message: 'Successfully Updated Comment',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateCommentDto,
    @UserId() userId: number,
  ) {
    const comment = await this.commentService.update(id, data, userId);

    return BaseService.transformResponse(
      comment,
      'Successfully Updated Comment',
    );
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted Comment',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.commentService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted Comment',
    );
  }
}
