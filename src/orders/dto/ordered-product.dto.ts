import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator'

export class OrderedProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  id: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number
}
