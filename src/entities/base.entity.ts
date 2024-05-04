import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  updatedAt: Date

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt?: Date | null
}
