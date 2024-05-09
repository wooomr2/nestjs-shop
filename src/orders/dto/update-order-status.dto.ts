import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ORDER_STATUS } from 'src/common/enums/order-status.enum'

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS
}
