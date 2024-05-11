import { ROLE } from '@libs/common'
import { ResponseEntity } from '@libs/common/response.entity'
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RolesGuard } from '../auth/guards'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard([ROLE.USER]))
  async findAll() {
    const users = await this.usersService.findAll()
    return ResponseEntity.OK_WITH(users)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)
    return ResponseEntity.OK_WITH(user)
  }
}
