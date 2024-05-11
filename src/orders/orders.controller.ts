import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ICurrentUser } from 'src/auth/types'
import { ResponseEntity } from 'src/common/classes/response.entity'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderStatusDto } from './dto/update-order-status.dto'
import { OrdersService } from './orders.service'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto, @CurrentUser() user: ICurrentUser) {
    await this.ordersService.create(dto, user)
    return ResponseEntity.OK()
  }

  @Patch(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateOrderStatusDto) {
    await this.ordersService.updateStatus(id, dto)
    return ResponseEntity.OK()
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll()
    return ResponseEntity.OK_WITH(orders)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const order = await this.ordersService.findOne(id)

    return ResponseEntity.OK_WITH(order)
  }
}
