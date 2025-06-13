import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminCategoriesService } from './admin-categories.service';
import { Category } from '../entities/category.entity';

describe('AdminCategoriesService', () => {
  let service: AdminCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminCategoriesService,
        { provide: getRepositoryToken(Category), useValue: {} }
      ],
    }).compile();

    service = module.get<AdminCategoriesService>(AdminCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
