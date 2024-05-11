import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomException } from 'src/common/exceptions/custom-exception'
import { CategoryEntity } from 'src/entities/category.entity'
import { Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(this.categoryRepository.create(dto))
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw CustomException.notFound('category')

    await this.categoryRepository.update({ id }, dto)
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.softDelete(id)
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find()
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw CustomException.notFound('category')

    return category
  }
}
