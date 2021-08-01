import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am running before the handler', context);
    //Before data is handled
    return next.handle().pipe(
      map((data: any) => {
        // Before data is sent out
        console.log('I am running before response is sent out', data);
      }),
    );
  }

  private serialize(object: any): any {
    return JSON.stringify(object);
  }
}
