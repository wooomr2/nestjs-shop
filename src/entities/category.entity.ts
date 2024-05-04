import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { ProductEntity } from './product.entity'

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  // Associations
  @OneToMany(() => ProductEntity, product => product.category)
  products: ProductEntity[]
}
