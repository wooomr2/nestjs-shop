import { CustomException } from '@libs/common'
import { UserEntity } from '@libs/db/entities'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find()
    return users
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw CustomException.notFound(`user`)

    return user
  }
}
