import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { AdminCategoriesService } from './admin-categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { PaginationDto } from '../../../common';

describe('AdminCategoriesService', () => {

  let service: AdminCategoriesService;

  const mockCategories = [
    { id: '3ad73bb8-1b09-421f-a951-fd3bfe7c5e97', name: 'Tech' },
    { id: 'ef8adcce-46ef-4dfe-b26c-c03d8b352c0f', name: 'Health' },
  ];

  const mockCategory = {
    id: 'f48ab15b-d12e-4b52-ac6e-62416ada71f4',
    name: 'Test category',
  } as Category;

  const mockCategoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminCategoriesService,
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepository }
      ],
    }).compile();

    service = module.get<AdminCategoriesService>(AdminCategoriesService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create category' , async () => {

    const dto: CreateCategoryDto = { name: 'Test category' };

    mockCategoryRepository.save.mockResolvedValue(mockCategory);

    const result = await service.create(dto);

    expect(result).toEqual(mockCategory);
    expect(mockCategoryRepository.create).toHaveBeenCalled();
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(dto);

  });

  it('should return paginated categories', async () => {

    const paginationDto: PaginationDto = { page: 2, limit: 5 };

    const total = 12;

    (mockCategoryRepository.findAndCount as jest.Mock).mockResolvedValue([mockCategories, total]);

    const result = await service.findAll(paginationDto);


    // Confirmamos que findAndCount es llamado con los parámetros correctos (skip, take, order)
    expect(mockCategoryRepository.findAndCount).toHaveBeenCalledWith({
      skip: 5,
      take: 5,
      order: { createdAt: 'DESC' },
    });

    // Confirmamos que el resultado tenga la estructura correcta de data y meta
    expect(result).toEqual({
      data: mockCategories,
      meta: {
        total: 12,
        per_page: 5,
        current_page: 2,
        last_page: 3,
      },
    });

  });

  describe('findOne', () => {

    it('should return a category if found', async () => {

      const id = 'ee157856-279d-4d9d-9041-cee11babec7b';

      mockCategoryRepository.findOneBy.mockResolvedValue(mockCategory);

      const result = await service.findOne(id);

      expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({id});
      expect(result).toEqual(mockCategory);

    });

    it('should throw NotFoundException if category is not found', async () => {

      const id = '629df279-7542-43d5-b3f0-6f877453ff4f';

      mockCategoryRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);

      await expect(service.findOne(id)).rejects.toThrow(
        `Category with id ${id} not found`
      );

    });

  }); // findOne

  describe('update', () => {

    it('should update and return the category if found', async () => {

      const id = '9f4c7974-e6c3-4c73-82fe-766f4f48668c';

      const dto: UpdateCategoryDto = { name: 'Updated Name' };

      const preloadedCategory = { id, ...dto };

      const savedCategory = { id, name: 'Updated Name', updatedAt: new Date() };

      mockCategoryRepository.preload.mockResolvedValue(preloadedCategory);
      mockCategoryRepository.save.mockResolvedValue(savedCategory);

      const result = await service.update(id, dto);

      expect(mockCategoryRepository.preload).toHaveBeenCalledWith({ id, ...dto });
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(preloadedCategory);
      expect(result).toEqual(savedCategory);

    });

    it('should throw NotFoundException if category does not exist', async () => {

      const id = 'bf11aef3-a274-4ef6-a6d1-5daa58cc9b42';

      const dto: UpdateCategoryDto = { name: 'Any Name' };

      mockCategoryRepository.preload.mockResolvedValue(null);

      await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);
      await expect(service.update(id, dto)).rejects.toThrow(`Category with id ${id} not found`)
      ;
    });

  }); // update

  describe('remove', () => {

    it('should soft delete the category if it exists', async () => {

      const id = '2b8fa3fb-b0ef-467f-8a6d-66ac1734daf7';

      jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory);
      (mockCategoryRepository.softRemove as jest.Mock).mockResolvedValue(undefined);

      const result = await service.remove(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(mockCategoryRepository.softRemove).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual({ message: 'Category deleted' });

    });

    it('should throw NotFoundException if category does not exist', async () => {

      const id = 'ce90c920-add8-4a04-9b67-50f8d54a689c';

      jest.spyOn(service, 'findOne').mockRejectedValue(
        new NotFoundException(`Category with id ${id} not found`)
      );

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);

    });

  }); // remove

});
