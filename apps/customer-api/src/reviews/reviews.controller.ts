import { ResponseEntity } from '@libs/common/response.entity'
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ReviewsService } from './reviews.service'
import { CurrentUser, Public } from '../auth/decorators'
import { ICurrentUser } from '../auth/types'

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto, @CurrentUser() user: ICurrentUser) {
    const review = await this.reviewsService.create(dto, user.id)
    return ResponseEntity.OK_WITH(review)
  }

  @Public()
  @Get()
  async findByProductId(@Query('productId', ParseIntPipe) productId: number) {
    const reviews = await this.reviewsService.findByProductId(productId)
    return ResponseEntity.OK_WITH(reviews)
  }

  @Get('/:id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const review = await this.reviewsService.findOneById(id)
    return ResponseEntity.OK_WITH(review)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    await this.reviewsService.update(+id, dto)
    return ResponseEntity.OK()
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(+id)
    return ResponseEntity.OK()
  }
}
