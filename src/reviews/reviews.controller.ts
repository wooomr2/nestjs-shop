import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { ICurrentUser } from 'src/auth/types'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto, @CurrentUser() user: ICurrentUser) {
    return await this.reviewsService.create(dto, user.id)
  }

  @Public()
  @Get()
  async findByProductId(@Query('productId', ParseIntPipe) productId: number) {
    return await this.reviewsService.findByProductId(productId)
  }

  @Get('/:id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.findOneById(id)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return await this.reviewsService.update(+id, dto)
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(+id)
  }
}
