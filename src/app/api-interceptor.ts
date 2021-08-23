import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable()

export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({
      url: `${environment.apiUrl}/${req.url}`,
      setParams: {
        app_id: environment.appId,
        base: environment.baseCurrency
      }});
    return next.handle(apiReq);
  }
}
