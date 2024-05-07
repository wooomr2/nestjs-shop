import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'
import { ResCode, ResMessage } from '../enums/response.enum'

export class ResponseDto {
  static OK(resCode = ResCode.OK, message = ResMessage.OK) {
    return { resCode, message }
  }

  static OKWith<T>(data: T, resCode = ResCode.OK, message = ResMessage.OK) {
    return { resCode, message, data }
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

  // Category
  static categoryNotFound() {
    return new NotFoundException({ resCode: ResCode.CATEGORY_NOT_FOUND, message: ResMessage.CATEGORY_NOT_FOUND })
  }
}
