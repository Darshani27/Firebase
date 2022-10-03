import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private auth:AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request);
  //   const token=localStorage.getItem('token');
  //   if(token)
  //   {
  //     request=request.clone({
  //       setHeaders:{
  //         Authorization:token
  //       }
  //     });
  //   }
  //   if(!request.headers.has('Content-Type'))
  //   {
  //     request=request.clone({
  //       setHeaders:{
  //         'content-type':'application/json'
  //       }
  //     });
  //   }
  //   request=request.clone({
  //     headers:request.headers.set('Accept','application/json')
  //   });
  //   return next.handle(request).pipe(
  //     map((event:HttpEvent<any>)=>{
  //       if(event instanceof HttpResponse)
  //       {
  //         console.log("event",event);
          
  //       }
  //       return event;
  //     }),
  //     catchError((err:HttpErrorResponse)=>{
  //       if(err.status==401)
  //       {
  //         this.router.navigate(['/login']);
  //       }
  //       return throwError(err);
  //     }
  //     ))
  // }
  return this.auth.idToken.pipe(
    take(1),
    mergeMap((token :any)=>{
      console.log(token);
      if(token)
      {
        request=request.clone(
          {
            setHeaders:{
              Authorization:`Bearer ${token}`
            }
          }
        )
      }
      return next.handle(request);
    }),
    catchError((err: HttpErrorResponse) => {
      if (err.status == 400) {
        this.router.navigate(['/login']);
      }
      return throwError(err);
    }
    ))
  // }
  }
}
