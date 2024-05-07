import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'
import { ResCode, ResMessage } from '../enums/res-message.enum'

export class ResponseEntity {
  static OK<T>(data?: T, resCode = ResCode.OK, message = ResMessage.OK) {
    return { resCode, message, data }
  }

  // Common
  static notFound(item: string) {
    return new NotFoundException({ resCode: ResCode.NOT_FOUND, message: `${item} ${ResMessage.NOT_FOUND}` })
  }

  // Auth
  static accessDenied() {
    return new ForbiddenException({ resCode: ResCode.ACCESS_DENIED, message: ResMessage.ACCESS_DENIED })
  }

  static emailExists() {
    return new BadRequestException({ resCode: ResCode.EMAIL_EXISTS, message: ResMessage.EMAIL_EXISTS })
  }

  static invalidUser() {
    return new BadRequestException({ resCode: ResCode.INVALID_USER, message: ResMessage.INVALID_USER })
  }

  static invalidPassword() {
    return new ForbiddenException({ resCode: ResCode.INVALID_PASSWORD, message: ResMessage.INVALID_PASSWORD })
  }
}
