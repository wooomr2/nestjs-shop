import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator'

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({})
  @Min(0)
  stock: number

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  images: string[]

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({})
  @Min(1)
  categoryId: number
}
