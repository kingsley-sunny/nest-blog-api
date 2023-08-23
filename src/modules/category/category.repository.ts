import { BaseRepository } from '../../database/base/base.repository';
import { ICategory } from '../../database/models/category/category.interface';
import { CategoryModel } from '../../database/models/category/category.model';

export class CategoryRepository extends BaseRepository<Partial<ICategory>> {
  constructor() {
    super(CategoryModel);
  }
}
