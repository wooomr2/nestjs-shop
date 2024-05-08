import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseEntity } from 'src/common/classes/response.entity'
import { OrderToProductEntity } from 'src/entities/order-to-product.entity'
import { ProductEntity } from 'src/entities/product.entity'
import { DataSource, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { PageProductDto } from './dto/page-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderToProductEntity)
    private readonly orderToProductRepository: Repository<OrderToProductEntity>,
    private readonly dataSource: DataSource,
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

    return ResponseEntity.OK()
  }

  async delete(id: number) {
    const order = await this.orderToProductRepository.findOneBy({ productId: id })
    if (order) throw ResponseEntity.productInUse()

    await this.productRepository.softDelete(id)

    return ResponseEntity.OK()
  }

  async findAll(query: PageProductDto) {
    const queryBuilder = this.dataSource
      .getRepository(ProductEntity)
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .addSelect(['category.id', 'category.title', 'category.description'])
      .leftJoin('product.reviews', 'review')
      .addSelect(['COUNT(review.id) AS review_cnt', 'COALESCE(AVG(review.rating)::numeric(10,2),0) AS avg_rating'])
      .groupBy('product.id, category.id')

    if (query.search) {
      queryBuilder.andWhere('product.title LIKE :title', { title: `%${query.search}%` })
    }

    if (query.categoryId) {
      queryBuilder.andWhere('category.id = :id', { id: query.categoryId })
    }

    if (query.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: query.minPrice })
    }

    if (query.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: query.maxPrice })
    }

    if (query.minRating) {
      queryBuilder.andHaving('COALESCE(AVG(review.rating), 0) >= :minRating', { minRating: query.minRating })
    }

    if (query.maxRating) {
      queryBuilder.andHaving('COALESCE(AVG(review.rating), 0) <= :maxRating', { maxRating: query.maxRating })
    }

    if (query.order) {
      queryBuilder.orderBy('product.createdAt', query.order)
    }

    const totalCount = await queryBuilder.getCount()

    queryBuilder.skip(query.skip).take(query.take)
    const products = await queryBuilder.getRawMany()

    return ResponseEntity.OK({ products, totalCount })
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

  // TODO:: updateStock
}
