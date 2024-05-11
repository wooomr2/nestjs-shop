import { ORDER_STATUS } from '@libs/common'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderToProductEntity } from './order-to-product.entity'
import { ShippingEntity } from './shipping.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PROCESSING })
  status: ORDER_STATUS

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  orderedAt: Date

  @Column({ nullable: true })
  shippedAt: Date

  @Column({ nullable: true })
  deliveredAt: Date

  // FK
  @Column({ nullable: false, select: false })
  shippingId: number

  @Column({ type: 'uuid', nullable: false, select: false })
  userId: string

  // Associations
  @OneToOne(() => ShippingEntity, shipping => shipping.order, { cascade: true })
  @JoinColumn() // to specify owner side of the relationship
  shipping: ShippingEntity

  @OneToMany(() => OrderToProductEntity, orderToProduct => orderToProduct.order, { cascade: true })
  orderToProduct: OrderToProductEntity[]

  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity
}
