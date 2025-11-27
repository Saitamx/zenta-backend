import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();
    const user = req.user ? `${req.user.email || req.user.sub}` : 'anonymous';
    const method = req.method;
    const url = req.originalUrl || req.url;
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        // eslint-disable-next-line no-console
        console.log(`[${user}] ${method} ${url} - ${ms}ms`);
      }),
    );
  }
}





