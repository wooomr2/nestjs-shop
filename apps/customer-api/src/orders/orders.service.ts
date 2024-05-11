import { CustomException, ORDER_STATUS } from '@libs/common'
import { OrderEntity, OrderToProductEntity, ProductEntity, ShippingEntity } from '@libs/entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, In, Repository } from 'typeorm'
import { ICurrentUser } from '../auth/types'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderStatusDto } from './dto/update-order-status.dto'

// TODO:: 재고처리로직

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    @InjectRepository(OrderToProductEntity)
    private readonly opRepository: Repository<OrderToProductEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: ICurrentUser): Promise<void> {
    const { shipppingAddress, orderedProducts } = createOrderDto

    const productIds = orderedProducts.map(product => product.id)

    await this.dataSource.manager.transaction(async manager => {
      const products = await manager.getRepository(ProductEntity).findBy({ id: In(productIds) })
      const shipping = await manager.save<ShippingEntity>(this.shippingRepository.create(shipppingAddress))

      const orderEntity = this.orderRepository.create({ userId: user.id, shippingId: shipping.id })
      const order = await manager.save<OrderEntity>(orderEntity)

      const opEntities: OrderToProductEntity[] = []
      for (const orderedProduct of orderedProducts) {
        const product = products.find(p => p.id === orderedProduct.id)
        if (!product) throw CustomException.notFound(`product`)
        if (product.stock < orderedProduct.quantity) throw CustomException.outOfStock()

        opEntities.push(
          this.opRepository.create({
            orderId: order.id,
            productId: product.id,
            productUnitPrice: product.price,
            productQuantity: orderedProduct.quantity,
          }),
        )
      }

      // to bulk-insert
      await manager.insert(OrderToProductEntity, opEntities)
    })
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<void> {
    const { status } = dto

    const order = await this.orderRepository.findOneBy({ id })
    if (!order) throw CustomException.notFound('order')

    if (status === ORDER_STATUS.SHIPPED) {
      order.shippedAt = new Date()
    }
    if (status === ORDER_STATUS.DELIVERED) {
      order.deliveredAt = new Date()
    }

    order.status = status
    await this.orderRepository.save(order)
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations: {
        shipping: true,
        orderToProduct: true,
      },
    })

    return orders
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: { shipping: true, orderToProduct: true },
    })
    if (!order) throw CustomException.notFound('order')

    return order
  }
}
