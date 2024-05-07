import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseDto } from 'src/common/dto/response.dto'
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

    return ResponseDto.OKWith({ category })
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw ResponseDto.categoryNotFound()

    const categoryEntity = this.categoryRepository.create(Object.assign(category, dto))
    const updatedCategory = await this.categoryRepository.save(categoryEntity)

    return ResponseDto.OKWith({ category: updatedCategory })
  }

  async delete(id: number) {
    await this.categoryRepository.softDelete(id)

    return ResponseDto.OK()
  }

  async findAll() {
    const categories = await this.categoryRepository.find()

    return ResponseDto.OKWith({ categories })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) throw ResponseDto.categoryNotFound()

    return ResponseDto.OKWith({ category })
  }
}
