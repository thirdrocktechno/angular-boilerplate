import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { HttpResponseHandlerService } from './http-response-handler-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private responseHandler: HttpResponseHandlerService,
    private spinner: NgxSpinnerService
  ) {}

  // method will add token in authorization header with each API call
  addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
    if (typeof req.body === 'string') {
      if (req.body.indexOf('grant_type') !== -1) {
        return req;
      }
    } else if (req.body && typeof req.body === 'object') {
      if (req.body.hasOwnProperty('grant_type')) {
        return req;
      }
    }

    if (req.headers.get('Authorization')) {
      return req;
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
      return req;
    } else {
      return req;
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next
      .handle(this.addToken(req, localStorage.getItem('auth-token')))
      .pipe(
        tap((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((err: any) => {
          this.responseHandler.onCatch(err);
          return throwError(err.statusText);
        }),
        finalize(() => {
          // hide loader after API call is successful
          setTimeout(() => {
            this.spinner.hide();
          }, 50);
        })
      );
  }
}
