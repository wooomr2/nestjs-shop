import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderToProductEntity } from 'src/entities/order-to-product.entity'
import { OrderEntity } from 'src/entities/order.entity'
import { ProductEntity } from 'src/entities/product.entity'
import { ShippingEntity } from 'src/entities/shipping.entity'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, OrderToProductEntity, ShippingEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
