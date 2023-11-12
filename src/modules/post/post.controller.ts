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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiConsumes,
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
  @UseInterceptors(FileInterceptor('file', BaseService.validateMulterFile()))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() data: CreatePostDto,
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const post = await this.postService.create(data, userId, file);

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
    const posts: any = await this.postService.find(params);

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
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', BaseService.validateMulterFile()))
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
    @UserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const post = await this.postService.update(Number(id), data, userId, file);

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
