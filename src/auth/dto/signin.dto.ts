import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { passwordOption } from '../constants'

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword(passwordOption)
  password: string
}
