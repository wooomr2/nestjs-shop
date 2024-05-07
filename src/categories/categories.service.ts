import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/entities/category.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryEntity = this.categoriesRepository.create(createCategoryDto)

    return await this.categoriesRepository.save(categoryEntity)
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesRepository.find()
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOneBy({ id })
    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const categoryEntity = this.categoriesRepository.create({ id, ...updateCategoryDto })

    return await this.categoriesRepository.save(categoryEntity)
  }
}
