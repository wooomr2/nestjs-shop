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
    private readonly reviewRepositoy: Repository<ReviewEntity>,
    @InjectRepository(ReviewEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateReviewDto, userId: string) {
    const product = await this.productRepository.findOneBy({ id: dto.productId })
    if (!product) throw ResponseEntity.notFound('product')

    const reviewEntity = this.reviewRepositoy.create({ ...dto, userId })
    const review = await this.reviewRepositoy.save(reviewEntity)

    return ResponseEntity.OK(review)
  }

  async findAll() {
    return `This action returns all reviews`
  }

  async findOne(id: number) {
    return `This action returns a #${id} review`
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`
  }

  async remove(id: number) {
    return `This action removes a #${id} review`
  }
}
