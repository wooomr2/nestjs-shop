import { IsStrongPasswordOptions } from 'class-validator'

export const passwordOption: IsStrongPasswordOptions = {
  minLength: 6,
  minUppercase: 0,
}
