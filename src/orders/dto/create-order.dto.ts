import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { CreateShippingDto } from './create-shipping.dto'
import { OrderedProductDto } from './ordered-product.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderDto {
  @ApiProperty({ type: () => CreateShippingDto })
  @Type(() => CreateShippingDto)
  @ValidateNested()
  shipppingAddress: CreateShippingDto

  @ApiProperty({ type: () => [OrderedProductDto] })
  @Type(() => OrderedProductDto)
  @ValidateNested()
  orderedProducts: OrderedProductDto[]
}
