import { ORDER_STATUS } from '@libs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS
}
