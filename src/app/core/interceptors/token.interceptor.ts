import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.tokenService.token;

    // add the token to the call if present and no token was passed with the headers already
    if (token && !req.headers.has('x-access-token')) {
      const authHeader: HttpRequest<any> = req.clone({ setHeaders: { 'x-access-token': token }});

      req = authHeader;
    }

    return next.handle(req);
  }
}
