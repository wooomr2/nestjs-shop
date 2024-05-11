import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { passwordOption } from '../constants'

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword(passwordOption)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  name: string
}
