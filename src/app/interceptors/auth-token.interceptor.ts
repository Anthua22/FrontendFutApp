import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(Storage.get({key: 'token'})).pipe(
      switchMap(token => {
        if (!token.value) { throw new Error(); }

        const authReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${token.value}`)
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
      }),
      catchError(e => next.handle(req))
    );
  }
}
