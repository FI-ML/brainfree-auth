import {Injectable} from '@angular/core';
import {LoginBackendService} from './backend/login-backend.service';
import {User} from '../../models/user/user';
import {Observable, tap} from 'rxjs';
import {SnackbarService} from '../snackbar.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly backendService: LoginBackendService,
              private readonly snackbarService: SnackbarService) {
  }


  signIn(user: User): Observable<any> {
    return this.backendService.signIn(user).pipe(
      tap(() => {
      }, (error: HttpErrorResponse) => {
        this.snackbarService.openErrorSnackBar(error.message);
      })
    );
  }
}
