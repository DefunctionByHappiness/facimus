import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    public toasterService: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = JSON.parse(localStorage.getItem('token'));

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Basic ${ token.username }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        /*
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        */
        try {
          this.toasterService.error(`${err.status}: ${err.statusText}`, err.error, { positionClass: 'toast-top-right', disableTimeOut: false });
        } catch(e) {
          this.toasterService.error('An error occurred', '', { positionClass: 'toast-top-right' });
        }
        //log error 

        return throwError( err );

      })
    );
  }

}
