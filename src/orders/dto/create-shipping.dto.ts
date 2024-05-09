import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class CreateShippingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phone: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  addressDetail: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postCode: string
}
