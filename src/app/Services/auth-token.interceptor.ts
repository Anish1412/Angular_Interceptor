import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthRestAPIService } from './AuthRestAPI.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthRestAPIService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.auth.authData.pipe(
      take(1),
      exhaustMap((user:any)=>{
        if(!user){
          return next.handle(request);
        }
        let modifiedRequest = request.clone({
          params: request.params.append('auth',user.token)
        })
        return next.handle(modifiedRequest);
      }))
  }
  
}
