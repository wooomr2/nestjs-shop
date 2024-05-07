import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.log(HttpExceptionFilter.name)

    const ctx = host.switchToHttp()

    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()
    console.log(exception)

    return response.status(status).json({
      statusCode: status,
      resCode: exception.getResponse()['resCode'],
      message: exception.getResponse()['message'],
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    })
  }
}
