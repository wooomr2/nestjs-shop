import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ROLE } from 'src/common/enums/roles.enum'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { UserEntity } from 'src/entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard(ROLE.USER))
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id)
  }
}
