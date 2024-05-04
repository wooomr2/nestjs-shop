import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'
import { UserEntity } from './user.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  rating: number

  @Column()
  comment: string

  // Associations
  @ManyToOne(() => UserEntity, user => user.reviews)
  user: UserEntity

  @ManyToOne(() => ProductEntity, product => product.reviews)
  product: ProductEntity
}
