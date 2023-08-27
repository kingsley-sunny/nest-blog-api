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
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { FetchQuery } from '../../database/base/base.interface';
import { PostImageModel } from '../../database/models/postImage';
import { Public } from '../../decorators/public.decorator';
import { CreatePostImageDto } from './dto/create-post-image.dto';
import { UpdatePostImageDto } from './dto/update-post-image.dto';
import { PostImageService } from './post-image.service';

@Controller('/post-images')
@ApiTags('post-images')
export class PostImageController {
  @Inject(PostImageService)
  private postImageService: PostImageService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: PostImageModel,
      message: 'PostImage Created Successfully',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() data: CreatePostImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const postImage = await this.postImageService.create(data, file);

    return BaseService.transformResponse(
      postImage,
      'PostImage Created Successfully',
    );
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: PostImageModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: true,
    }),
  })
  @Get()
  async find(@Query() params: FetchQuery) {
    const postImages: any = await this.postImageService.find(params);

    return BaseService.transformResponse(postImages, 'Successful');
  }

  @Public()
  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: PostImageModel,
      message: 'Successful',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const postImage = await this.postImageService.findById(id);

    return BaseService.transformResponse(postImage, 'Successful');
  }

  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: PostImageModel,
      message: 'Successfully Updated PostImage',
      statusCode: 201,
      isPaginate: false,
    }),
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdatePostImageDto) {
    const postImage = await this.postImageService.update(id, data);

    return BaseService.transformResponse(
      postImage,
      'Successfully Updated PostImage',
    );
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: Number,
      message: 'Successfully Deleted PostImage',
      statusCode: 200,
      isPaginate: false,
    }),
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.postImageService.delete(id);

    return BaseService.transformResponse(
      { status: deleted },
      'Successfully Deleted PostImage',
    );
  }
}
