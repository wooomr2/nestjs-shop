import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseEntity } from 'src/common/classes/response.entity'
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

  async create(dto: CreateCategoryDto) {
    const categoryEntity = this.categoryRepository.create(dto)
    const category = await this.categoryRepository.save(categoryEntity)

    return ResponseEntity.OK(category)
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw ResponseEntity.notFound('category')

    await this.categoryRepository.update({ id }, dto)

    return ResponseEntity.OK()
  }

  async delete(id: number) {
    await this.categoryRepository.softDelete(id)

    return ResponseEntity.OK()
  }

  async findAll() {
    const categories = await this.categoryRepository.find()

    return ResponseEntity.OK(categories)
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw ResponseEntity.notFound('category')

    return ResponseEntity.OK(category)
  }
}
