import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ProductEntity } from './product.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  rating: number

  @Column()
  comment: string

  // FK
  @Column({ type: 'uuid', nullable: false })
  userId: string

  @Column({ nullable: false })
  productId: number

  // Associations
  @ManyToOne(() => UserEntity, user => user.reviews)
  user: UserEntity

  @ManyToOne(() => ProductEntity, product => product.reviews)
  product: ProductEntity
}
