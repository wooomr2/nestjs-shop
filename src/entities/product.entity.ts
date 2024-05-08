import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CategoryEntity } from './category.entity'
import { OrderToProductEntity } from './order-to-product.entity'
import { ReviewEntity } from './review.entity'

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number

  @Column()
  stock: number

  @Column('simple-array')
  images: string[]

  // FK
  @Column({ nullable: false, select: false })
  categoryId: number

  // Associations
  @ManyToOne(() => CategoryEntity, cat => cat.products)
  category: CategoryEntity

  @OneToMany(() => ReviewEntity, review => review.product)
  reviews: ReviewEntity[]

  @OneToMany(() => OrderToProductEntity, orderToProduct => orderToProduct.product)
  orderToProduct: OrderToProductEntity[]
}
