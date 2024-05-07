import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseEntity } from 'src/common/entities/response.entity'
import { ProductEntity } from 'src/entities/product.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateProductDto) {
    const productEntity = this.productRepository.create(dto)
    const product = await this.productRepository.save(productEntity)

    return ResponseEntity.OK(product)
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) throw ResponseEntity.notFound('product')

    await this.productRepository.update({ id }, dto)
  }

  async delete(id: number) {
    await this.productRepository.softDelete(id)

    return ResponseEntity.OK()
  }

  async findAll() {
    const products = await this.productRepository.find()

    return ResponseEntity.OK(products)
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
      },
      select: {
        category: {
          id: true,
          title: true,
        },
      },
    })
    if (!product) throw ResponseEntity.notFound('product')

    return ResponseEntity.OK(product)
  }
}
