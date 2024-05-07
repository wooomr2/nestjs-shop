import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CategoryEntity } from 'src/entities/category.entity'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll()
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryEntity> {
    return this.categoriesService.findOne(id)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.update(id, UpdateCategoryDto)
  }
}
