import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('authToken');
        console.log('AuthInterceptor: authToken =', authToken);

        if (authToken) {
        const cloned = req.clone({
            setHeaders: {
            Authorization: `Bearer ${authToken}`
            }
        });

        return next.handle(cloned);
        }

        return next.handle(req);
    }
}
