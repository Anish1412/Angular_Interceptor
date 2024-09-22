import { HttpHandler, HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request:HttpRequest<any>, next:HttpHandler){
        let modifiedRequest = request.clone({
            // headers : request.headers.append('skill1','Java'),
            // params : request.params.append('skill2','CSS')
        })
        return next.handle(request);
    }
}