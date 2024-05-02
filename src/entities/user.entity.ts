import { ROLE } from 'src/common/enums/roles.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('users')
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
}
