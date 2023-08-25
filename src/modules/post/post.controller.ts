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
import { PostModel } from '../../database/models/post';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('/posts')
@ApiTags('posts')
export class PostController {
  @Inject(PostService)
  private postService: PostService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: PostModel,
      message: 'Post Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  async create(@Body() data: CreatePostDto, @UserId() userId: number) {
    const post = await this.postService.create(data, userId);

    return BaseService.transformResponse(post, 'Post Created Successfully');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: PostModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(@Query() params: FetchQuery) {
    const posts = await this.postService.find(params);

    return BaseService.transformResponse(posts, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: PostModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const post = await this.postService.findById(id);

    return BaseService.transformResponse(post, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: PostModel,
      message: 'Successfully Updated Post',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
    @UserId() userId: number,
  ) {
    const post = await this.postService.update(id, data, userId);

    return BaseService.transformResponse(post, 'Successfully Updated Post');
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted Post',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.postService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted Post',
    );
  }
}