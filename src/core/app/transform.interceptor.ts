import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    data,
                    code: 0,
                    message: 'success',
                };
            }),
        );
    }
}
