import {Injectable} from '@angular/core';
import {LoginBackendService} from './backend/login-backend.service';
import {User} from '../../models/user/user';
import {Observable, tap} from 'rxjs';
import {SnackbarService} from '../snackBar/snackbar.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly backendService: LoginBackendService,
              private readonly snackbarService: SnackbarService) {
  }


  signIn(user: User): Observable<Token> {
    return this.backendService.signIn(user).pipe(
      tap(() => {
      }, (error: HttpErrorResponse) => {
        this.snackbarService.openErrorSnackBar(error.message);
      })
    );
  }
}
