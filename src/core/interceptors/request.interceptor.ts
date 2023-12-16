import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthHelperService } from '../helper-services';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private AUTHORIZATION_HEADER_PREFIX = 'Bearer ';

  constructor(private _authHelper: AuthHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this._authHelper.isLoggedIn()) {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: this.AUTHORIZATION_HEADER_PREFIX + this._authHelper.getSession()
        }
      });
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }
}
