import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { AppHttpException } from './app-http-exception';
import { Request, Response } from 'express';

@Catch(AppHttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: AppHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(exception.statusCode).json({
      statusCode: exception.getStatus() || 500,
      message: exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
