import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

// this interceptor will catch all the exceptions and return a 500 error
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: HttpException) => {
        this.logger.error(
          `interceptor > exception > internal server error when trying to access the route: ${
            _.switchToHttp().getRequest().url
          } (method: ${_.switchToHttp().getRequest().method})`,
        );

        // for login exception
        if (error instanceof UnauthorizedException)
          throw new UnauthorizedException();

        throw new InternalServerErrorException();
      }),
    );
  }
}
