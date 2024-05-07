import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDto) {
    return await this.categoriesService.create(dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id)
  }

  @Public()
  @Get()
  async findAll() {
    return await this.categoriesService.findAll()
  }

  @Public()
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.findOne(id)
  }
}
