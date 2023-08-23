import { BaseModel } from '../../base/base.model';
import { DATABASE_TABLES } from '../../database.tables';
import { ICategory } from './category.interface';
import { CategoryValidation } from './category.validation';

export class CategoryModel extends BaseModel implements ICategory {
  public id: ICategory['id'];
  public uuid: ICategory['uuid'];
  public created_at: ICategory['created_at'];
  public updated_at: ICategory['updated_at'];

  public name: ICategory['name'];

  static get tableName() {
    return DATABASE_TABLES.categories;
  }

  static get jsonSchema() {
    return CategoryValidation;
  }
}
