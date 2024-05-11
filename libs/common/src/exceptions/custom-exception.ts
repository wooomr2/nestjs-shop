import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'
import { ResCode, ResMessage } from '../enums/response.enum'

export class CustomException {
  static notFound(item?: string) {
    return new NotFoundException({ resCode: ResCode.NOT_FOUND_ITEM, message: `${item} ${ResMessage.NOT_FOUND_ITEM}` })
  }

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

  static productInUse() {
    return new BadRequestException({ resCode: ResCode.PRODUCT_IN_USE, message: ResMessage.PRODUCT_IN_USE })
  }

  static reviewExists() {
    return new BadRequestException({ resCode: ResCode.REVIEW_EXISTS, message: ResMessage.REVIEW_EXISTS })
  }

  static outOfStock() {
    return new BadRequestException({ resCode: ResCode.OUT_OF_STOCK, message: ResMessage.OUT_OF_STOCK })
  }

  static invalidOrderStatus() {
    return new BadRequestException({ resCode: ResCode.INVALID_ORDER_STATUS, message: ResMessage.INVALID_ORDER_STATUS })
  }
}
