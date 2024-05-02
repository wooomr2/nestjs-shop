import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
import { passwordOption } from 'src/common/constants'

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword(passwordOption)
  password: string

  @IsNotEmpty()
  name: string
}
