import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';
import { Category } from '../entities/category.entity';

describe('AdminCategoriesController', () => {
  let controller: AdminCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCategoriesController],
      providers: [
        AdminCategoriesService,
        { provide: getRepositoryToken(Category), useValue: {} }
      ],
    }).compile();

    controller = module.get<AdminCategoriesController>(AdminCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
