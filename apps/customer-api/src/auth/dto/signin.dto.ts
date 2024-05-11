import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { passwordOption } from '../constants'

export class SigninDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword(passwordOption)
  password: string
}
