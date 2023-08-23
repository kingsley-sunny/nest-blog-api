import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { ICategory } from '../../database/models/category/category.interface';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  @Inject(CategoryRepository)
  categoryRepository: CategoryRepository;

  async create(data: CreateCategoryDto) {
    Logger.log('create', 'CategoryService');

    let category: ICategory;
    try {
      const { name } = data;

      category = await this.categoryRepository.create({
        name: name,
      });
    } catch (error) {
      Logger.log(error.message, 'CategoryService');

      throw new InternalServerErrorException(error.message);
    }

    return category;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'CategoryService');

    try {
      const categories = await this.categoryRepository.find({}, params);

      return categories;
    } catch (error) {
      Logger.log(error.message, 'CategoryService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<ICategory>) {
    Logger.log('findOne', 'CategoryService');

    const category = await this.categoryRepository.findOne(params);

    return category;
  }

  async findById(id: number) {
    Logger.log('findById', 'CategoryService');

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, data: CreateCategoryDto) {
    Logger.log('update', 'CategoryService');

    try {
      const category = await this.categoryRepository.update(id, data);

      return category;
    } catch (error) {
      Logger.error(error.message, 'CategoryService');
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'CategoryService');

    return await this.categoryRepository.delete(id);
  }
}
