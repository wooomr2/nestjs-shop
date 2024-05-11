import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayloadWithRt } from '../types'

export const CurrentPaylaod = createParamDecorator(
  (key: keyof JwtPayloadWithRt, context: ExecutionContext): Partial<JwtPayloadWithRt> => {
    const request = context.switchToHttp().getRequest()

    if (!key) return request.user
    return request.user[key]
  },
)
