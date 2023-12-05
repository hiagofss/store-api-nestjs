import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNative: ConsoleLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.loggerNative.error(exception);
    console.error('exception', exception);

    const { httpAdapter } = this.adapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if ('user' in request) {
      this.loggerNative.log(`Route access by ${request.user.sub}`);
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
              message: 'Internal server error',
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
