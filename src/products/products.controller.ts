import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ResponseEntity } from 'src/common/classes/response.entity'
import { Public } from 'src/common/decorators/public.decorator'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { ApiPaginatedResponse } from 'src/swagger/api-paginated-response'
import { CreateProductDto } from './dto/create-product.dto'
import { FindAllProductDto } from './dto/find-all-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Post()
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productsService.create(dto)

    return ResponseEntity.OK_WITH(product)
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    await this.productsService.update(id, dto)

    return ResponseEntity.OK()
  }

  @UseGuards(RolesGuard([ROLE.ADMIN]))
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id)

    return ResponseEntity.OK()
  }

  @ApiPaginatedResponse(FindAllProductDto)
  @Public()
  @Get()
  async findAll(@Query() query: FindAllProductDto) {
    const productPageDto = await this.productsService.findAll(query)

    return ResponseEntity.OK_WITH(productPageDto)
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id)

    return ResponseEntity.OK_WITH(product)
  }
}
