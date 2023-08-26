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
import { CommentLikeModel } from '../../database/models/commentLike';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';

@Controller('/comment-likes')
@ApiTags('comment-likes')
export class CommentLikeController {
  @Inject(CommentLikeService)
  private commentLikeService: CommentLikeService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: CommentLikeModel,
      message: 'CommentLike Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreateCommentLikeDto, @UserId() userId: number) {
    const commentLike = await this.commentLikeService.create(data, userId);

    return BaseService.transformResponse(
      commentLike,
      'CommentLike Created Successfully',
    );
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: CommentLikeModel,
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
    const commentLikes: any = await this.commentLikeService.find(
      params,
      comment_id,
    );

    return BaseService.transformResponse(commentLikes, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: CommentLikeModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const commentLike = await this.commentLikeService.findById(id);

    return BaseService.transformResponse(commentLike, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: CommentLikeModel,
      message: 'Successfully Updated CommentLike',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateCommentLikeDto,
    @UserId() userId: number,
  ) {
    const commentLike = await this.commentLikeService.update(id, data, userId);

    return BaseService.transformResponse(
      commentLike,
      'Successfully Updated CommentLike',
    );
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted CommentLike',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.commentLikeService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted CommentLike',
    );
  }
}
