import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let curretnUser: User;

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => curretnUser = user)

    if(curretnUser){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${curretnUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
