import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
