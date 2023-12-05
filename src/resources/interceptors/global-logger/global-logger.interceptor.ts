import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequestUser } from '../../../authentication/guard/auth/auth.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request | RequestUser>();
    const response = httpContext.getResponse<Response>();

    const { method, path } = request;
    this.logger.log(`Request ${method} ${path}`);
    const { statusCode } = response;

    const instancePreController = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            `Request ${request.method} ${request.url} - User: ${request.user.sub}`,
          );
        }

        const instancePostController = Date.now() - instancePreController;
        this.logger.log(
          `Response ${statusCode} ${method} ${path} - ${instancePostController}ms`,
        );
      }),
    );
  }
}
