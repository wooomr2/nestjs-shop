import { ROLE } from 'src/common/enums/roles.enum'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
import { OrderEntity } from './order.entity'
import { ReviewEntity } from './review.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column()
  name: string

  @Column({ type: 'enum', enum: ROLE, array: true, default: [ROLE.USER] })
  roles: ROLE[]

  @Column({ nullable: true })
  refreshToken?: string | null

  // Associtaions
  @OneToMany(() => OrderEntity, order => order.user)
  orders: OrderEntity[]

  @OneToMany(() => ReviewEntity, review => review.user)
  reviews: ReviewEntity[]
}
