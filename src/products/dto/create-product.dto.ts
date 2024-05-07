import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number

  @IsNotEmpty()
  @IsNumber({})
  @Min(0)
  stock: number

  @IsNotEmpty()
  @IsArray()
  images: string[]

  @IsNotEmpty()
  @IsNumber({})
  @Min(1)
  categoryId: number
}
