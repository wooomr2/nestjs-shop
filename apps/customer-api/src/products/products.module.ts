import { OrderToProductEntity, ProductEntity } from '@libs/entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, OrderToProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
