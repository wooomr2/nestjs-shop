import { OrderEntity, OrderToProductEntity, ProductEntity, ShippingEntity } from '@libs/db/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity, OrderToProductEntity, ShippingEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
