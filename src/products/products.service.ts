import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { ResponseEntity } from 'src/common/classes/response.entity'
import { PageDto } from 'src/common/dtos/page/page.dto'
import { OrderToProductEntity } from 'src/entities/order-to-product.entity'
import { ProductEntity } from 'src/entities/product.entity'
import { DataSource, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { FindAllProductDto } from './dto/find-all-product.dto'
import { ProductDto } from './dto/response/product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(OrderToProductEntity)
    private readonly orderToproductRepo: Repository<OrderToProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepo.save(this.productRepo.create(dto))

    return product
  }

  async update(id: number, dto: UpdateProductDto): Promise<void> {
    const product = await this.productRepo.findOneBy({ id })
    if (!product) throw ResponseEntity.notFound('product')

    await this.productRepo.update({ id }, dto)
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderToproductRepo.findOneBy({ productId: id })
    if (order) throw ResponseEntity.productInUse()

    await this.productRepo.softDelete(id)
  }

  async findAll(query: FindAllProductDto): Promise<PageDto<ProductDto>> {
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

    queryBuilder.orderBy('product.created_at', 'DESC')

    const totalCount = await queryBuilder.getCount()

    queryBuilder.skip(query.skip).take(query.take)
    const rawProducts = await queryBuilder.getRawMany()

    const productDtos = plainToInstance(ProductDto, rawProducts, { excludeExtraneousValues: true })

    return new PageDto(productDtos, totalCount, query)
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
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

    return product
  }
}
