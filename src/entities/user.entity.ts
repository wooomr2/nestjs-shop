import { IsEmail } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  // @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  // Roles: ROLES[]

  @Column({ nullable: true })
  refreshToken?: string | null
}
