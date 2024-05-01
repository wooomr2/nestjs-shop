import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { ICurrentUser, JwtPayloadWithRt } from 'src/auth/types'

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt, context: ExecutionContext): ICurrentUser => {
    const request = context.switchToHttp().getRequest()

    const currentUser = {
      id: request.user.sub,
      email: request.user.email,
      // roles: request.user.roles,
    }
    console.log('currentUser', currentUser)
    return currentUser
  },
)
