import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { AuthHelperService } from '../helper-services';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private _authHelper: AuthHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        err.error.message ? null : (err.error.message = `Unknown Error`);
        return throwError(err);
      }))
  }
}
