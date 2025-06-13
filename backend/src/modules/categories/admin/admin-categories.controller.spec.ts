import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { PaginationDto } from '../../../common';

describe('AdminCategoriesController', () => {
  let controller: AdminCategoriesController;
  let service: AdminCategoriesService;

  const mockAdminCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCategoriesController],
      providers: [
        { provide: AdminCategoriesService, useValue: mockAdminCategoriesService },
        { provide: getRepositoryToken(Category), useValue: {} }
      ],
    }).compile();

    controller = module.get<AdminCategoriesController>(AdminCategoriesController);
    service    = module.get<AdminCategoriesService>(AdminCategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with valid dto', async () => {
    const dto: CreateCategoryDto = { name: 'New category' };

    await controller.create(dto);

    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

   it('it should call service.findAll with paginationDto', async () => {

    const dto: PaginationDto = { page: 1, limit: 10 };

    await controller.findAll(dto);

    expect(service.findAll).toHaveBeenCalled();
    expect(service.findAll).toHaveBeenCalledWith(dto);

  });

  it('should call service.findOne with valid id', async () => {

    const id = 'c25a7358-2fd6-42b6-9566-46c392230a6b'; // UUID valido

    await controller.findOne(id);

    expect(service.findOne).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(id);

  });

  it('should call service.update with valid id and dto', async () => {

    const id = 'c25a7358-2fd6-42b6-9566-46c392230a6b'; // UUID valido

    const dto: UpdateCategoryDto = { name: 'Updated name' };

    await controller.update(id, dto);

    expect(service.update).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalledWith(id, dto);

  });

   it('should call service.remove with valid id', async() => {

    const id = 'c25a7358-2fd6-42b6-9566-46c392230a6b'; // UUID valido

    await controller.remove(id);

    expect(service.remove).toHaveBeenCalled();
    expect(service.remove).toHaveBeenCalledWith(id);

  });

});
