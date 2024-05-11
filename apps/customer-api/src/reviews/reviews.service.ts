import { CustomException } from '@libs/common'
import { ProductEntity, ReviewEntity } from '@libs/db/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateReviewDto, userId: string): Promise<ReviewEntity> {
    const product = await this.productRepository.countBy({ id: dto.productId })
    if (!product) throw CustomException.notFound('product')

    const reviewExists = await this.reviewRepository.countBy({ productId: dto.productId, userId })
    if (reviewExists) throw CustomException.reviewExists()

    const reviewEntity = this.reviewRepository.create({ ...dto, userId })
    const review = await this.reviewRepository.save(reviewEntity)

    return review
  }

  async findByProductId(productId: number): Promise<ReviewEntity[]> {
    const reviews = await this.reviewRepository.find({
      where: { productId },
      select: {
        user: { email: true, name: true },
      },
      relations: {
        user: true,
      },
      order: { createdAt: 'DESC' },
    })

    return reviews
  }

  async findOneById(id: number): Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      select: {
        user: { email: true, name: true },
      },
      relations: {
        user: true,
      },
    })
    if (!review) throw CustomException.notFound('review')

    return review
  }

  async update(id: number, dto: UpdateReviewDto): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id })
    if (!review) throw CustomException.notFound('review')

    await this.reviewRepository.update({ id }, dto)
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.softDelete(id)
  }
}
