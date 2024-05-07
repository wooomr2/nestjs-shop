import { CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: true })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, select: false })
  deletedAt?: Date | null
}
