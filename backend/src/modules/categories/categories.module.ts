import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './admin/admin-categories.service';
import { AdminCategoriesController } from './admin/admin-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService],
})
export class CategoriesModule {}
