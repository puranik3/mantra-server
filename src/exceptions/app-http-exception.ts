import { HttpException, HttpStatus } from '@nestjs/common';

// type HttpExceptionConstructorArgs = ConstructorParameters<typeof HttpException>;

export enum KnownAppHttpExceptionName {
  CastError = 'CastError',
  MongoServerError = 'MongoServerError',
  NotFound = 'NotFound',
  ValidationError = 'ValidationError',
}

export type AppHttpExceptionConstructorArgs = {
  name?: KnownAppHttpExceptionName | string;
  message?: string;
  error?: Error;
  statusCode?: HttpStatus;
};

export class AppHttpException extends HttpException {
  statusCode: HttpStatus;

  constructor({
    name,
    message,
    error,
    statusCode,
  }: AppHttpExceptionConstructorArgs = {}) {
    let inferredStatusCode = 500;
    let inferredMessage = null;

    switch (name) {
      case KnownAppHttpExceptionName.CastError:
        inferredStatusCode = HttpStatus.BAD_REQUEST;
        inferredMessage = 'Type casting failed';
        break;
      case KnownAppHttpExceptionName.ValidationError:
        inferredStatusCode = HttpStatus.BAD_REQUEST;
        inferredMessage = 'Validation check on data failed';
        break;
      case KnownAppHttpExceptionName.NotFound:
        inferredStatusCode = HttpStatus.NOT_FOUND;
        inferredMessage = 'Resource not found';
        break;
      case KnownAppHttpExceptionName.MongoServerError:
        if ('code' in error && error.code === 11000) {
          inferredStatusCode = HttpStatus.CONFLICT;
          inferredMessage =
            'The resource could not be created due to a conflict with an existing resource.';
        }
        break;
      default:
        inferredStatusCode = 500;
        inferredMessage = 'Internal server error';
    }

    super(message || inferredMessage, statusCode || inferredStatusCode, {
      cause: error || new Error('Unknown error'),
    });

    this.name = name || 'UnknownError';
    this.statusCode = statusCode || inferredStatusCode;
  }
}
