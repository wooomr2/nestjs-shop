import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { Public } from 'src/common/decorators/public.decorator'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return await this.productsService.create(dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return await this.productsService.update(id, dto)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id)
  }

  @Public()
  @Get()
  async findAll() {
    return await this.productsService.findAll()
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id)
  }
}
