import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from './order.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'shipping' })
export class ShippingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  phone: string

  @Column()
  name: string

  @Column({ length: 3 })
  country: string

  @Column()
  address: string

  @Column()
  addressDetail: string

  @Column()
  postCode: string

  @OneToOne(() => OrderEntity, order => order.shipping)
  order: OrderEntity
}
