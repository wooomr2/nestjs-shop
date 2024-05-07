import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { OrderEntity } from './order.entity'
import { ProductEntity } from './product.entity'

/** Mapping Table */
@Entity({ name: 'order_to_product' })
export class OrderToProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  productUnitPrice: number

  @Column()
  productQuantity: number

  // FK
  @Column({ type: 'uuid', nullable: false })
  orderId: string

  @Column({ nullable: false })
  productId: number

  // Associations
  @ManyToOne(() => OrderEntity, order => order.orderToProduct)
  order: OrderEntity

  @ManyToOne(() => ProductEntity, product => product.orderToProduct, { cascade: true })
  product: ProductEntity
}
