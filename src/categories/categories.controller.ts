import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id)
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id)
  }
}
