import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common'
import { ROLE } from '../enums/roles.enum'

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const allowedRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
//     if (!allowedRoles) return true

//     const request = context.switchToHttp().getRequest()
//     const user = request.user as JwtPayload
//     if (!user) return false

//     const result = user.roles.some((role: ROLE) => allowedRoles.includes(role))

//     return result
//   }
// }

export const RolesGuard = (allowedRoles: ROLE[]) => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest()
      const user = request.user
      if (!user) return false

      return allowedRoles.some(role => user.roles.includes(role))
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
