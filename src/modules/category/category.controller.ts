import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { ROLES } from '../../base/base.constant';
import { FetchQuery } from '../../database/base/base.interface';
import { CategoryModel } from '../../database/models/category/category.model';
import { Roles } from '../../decorators/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Roles(ROLES.OWNER, ROLES.ADMIN)
@Controller('/categories')
@ApiTags('categories')
export class CategoryController {
  @Inject(CategoryService)
  private categoryService: CategoryService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: CategoryModel,
      message: 'Successfully Created Category',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(data);

    return BaseService.transformResponse(
      category,
      'Category Created Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const categories = await this.categoryService.find(params);

    return BaseService.transformResponse(categories, 'Successful');
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const category = await this.categoryService.findById(id);

    return BaseService.transformResponse(category, 'Successful');
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: CreateCategoryDto) {
    const category = await this.categoryService.update(id, data);

    return BaseService.transformResponse(category, 'Successful');
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const deleted = await this.categoryService.delete(id);

      return deleted;
    } catch (error) {
      Logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
