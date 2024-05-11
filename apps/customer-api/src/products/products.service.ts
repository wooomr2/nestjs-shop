import { CustomException } from '@libs/common'
import { PageDto } from '@libs/common/dtos/page'
import { OrderToProductEntity, ProductEntity } from '@libs/entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { DataSource, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { FindAllProductDto } from './dto/find-all-product.dto'
import { ProductDto } from './dto/response/product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderToProductEntity)
    private readonly orderToproductRepository: Repository<OrderToProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.save(this.productRepository.create(dto))

    return product
  }

  async update(id: number, dto: UpdateProductDto): Promise<void> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) throw CustomException.notFound('product')

    await this.productRepository.update({ id }, dto)
  }

  async delete(id: number): Promise<void> {
    const order = await this.orderToproductRepository.findOneBy({ productId: id })
    if (order) throw CustomException.productInUse()

    await this.productRepository.softDelete(id)
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
    if (!product) throw CustomException.notFound('product')

    return product
  }
}
