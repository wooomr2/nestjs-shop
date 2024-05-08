import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from 'src/common/decorators/public.decorator'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { PageProductDto } from './dto/page-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'
import { ApiPaginatedResponse } from 'src/swagger/api-paginated-response'

@ApiTags('products')
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

  @ApiPaginatedResponse(PageProductDto)
  @Public()
  @Get()
  async findAll(@Query() query: PageProductDto) {
    return await this.productsService.findAll(query)
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id)
  }
}
