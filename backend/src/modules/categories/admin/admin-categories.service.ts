import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../common';

@Injectable()
export class AdminCategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {

    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);

  }

  async findAll(paginationDto: PaginationDto) {
    
    const { page = 1, limit = 10} = paginationDto;
    
    const skip = ( page - 1 ) * limit;

    const [categories, total] = await this.categoryRepository.findAndCount({

      skip,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
      
    });

    const lastPage = Math.ceil( total / limit );

    return {
      data: categories,

      meta: {
        total: total,
        per_page: Number(limit),
        current_page: Number(page),
        last_page: lastPage
      }
    }

  }

  async findOne(id: string): Promise<Category> {

    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;

  }


  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {

    // Construir una nueva entidad con los cambios
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoryRepository.save(category);

  }

  async remove(id: string): Promise<{ message: string }> {

    const category = await this.findOne(id);

    await this.categoryRepository.softRemove(category);

    return { message: 'Category deleted' };

  }

}
