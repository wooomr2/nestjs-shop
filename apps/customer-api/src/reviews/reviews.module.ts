import { ProductEntity, ReviewEntity } from '@libs/entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, ProductEntity])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
