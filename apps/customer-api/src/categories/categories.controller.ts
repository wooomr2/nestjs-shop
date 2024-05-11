import { ROLE } from '@libs/common'
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
import { ApiTags } from '@nestjs/swagger'
import { Public } from '../auth/decorators'
import { RolesGuard } from '../auth/guards'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ResponseEntity } from '@libs/common/response.entity'

@ApiTags('reviews')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.categoriesService.create(dto)
    return ResponseEntity.OK_WITH(category)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    await this.categoriesService.update(id, dto)
    return ResponseEntity.OK()
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.categoriesService.delete(id)
    return ResponseEntity.OK()
  }

  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll()
    return ResponseEntity.OK_WITH(categories)
  }

  @Public()
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id)
    return ResponseEntity.OK_WITH(category)
  }
}
