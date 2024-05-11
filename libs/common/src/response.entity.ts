import { ResCode, ResMessage } from './enums/response.enum'

export class ResponseEntity {
  static OK(resCode = ResCode.OK, message = ResMessage.OK) {
    return { resCode, message }
  }

  static OK_WITH<T>(data: T, resCode = ResCode.OK, message = ResMessage.OK) {
    return { resCode, message, data }
  }
}
