import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserEntity } from 'src/entities/user.entity'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard([ROLE.USER]))
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(id)
  }
}
