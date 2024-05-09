import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseEntity } from 'src/common/classes/response.entity'
import { ProductEntity } from 'src/entities/product.entity'
import { ReviewEntity } from 'src/entities/review.entity'
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

  async create(dto: CreateReviewDto, userId: string) {
    const product = await this.productRepository.countBy({ id: dto.productId })
    if (!product) throw ResponseEntity.notFound('product')

    const reviewExists = await this.reviewRepository.countBy({ productId: dto.productId, userId })
    if (reviewExists) throw ResponseEntity.reviewExists()

    const reviewEntity = this.reviewRepository.create({ ...dto, userId })
    const review = await this.reviewRepository.save(reviewEntity)

    return ResponseEntity.OK(review)
  }

  async findByProductId(productId: number) {
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

    return ResponseEntity.OK(reviews)
  }

  async findOneById(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id },
      select: {
        user: { email: true, name: true },
      },
      relations: {
        user: true,
      },
    })
    if (!review) throw ResponseEntity.notFound('review')

    return ResponseEntity.OK(review)
  }

  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOneBy({ id })
    if (!review) throw ResponseEntity.notFound('review')

    await this.reviewRepository.update({ id }, dto)

    return ResponseEntity.OK()
  }

  async remove(id: number) {
    await this.reviewRepository.softDelete(id)

    return ResponseEntity.OK()
  }
}
