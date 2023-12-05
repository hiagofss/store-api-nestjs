import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { RequestUser } from '../../../authentication/guard/auth/auth.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request | RequestUser>();

    this.logger.log(`Request ${request.method} ${request.url}}`);

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            `Response ${request.method} ${request.url} - User: ${request.user.sub}`,
          );
        }
      }),
    );
  }
}
