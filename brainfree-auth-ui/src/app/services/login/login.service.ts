import {Injectable} from '@angular/core';
import {LoginBackendService} from './backend/login-backend.service';
import {User} from '../../models/user';
import {Observable, tap} from 'rxjs';
import {Token} from '../../models/token';
import {SnackbarService} from '../snackbar.service';
import {AppSettings} from '../../app-settings';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly backendService: LoginBackendService,
              private readonly snackbarService: SnackbarService) {
  }


  signIn(user: User): Observable<Token> {
    return this.backendService.signIn(user).pipe(
      tap((tokens) => {
        if (tokens.accessToken.length > 0 && tokens.refreshToken.length > 0) {
          const message = 'You are sign in';
          this.snackbarService.openSuccessSnackBar(message, AppSettings.DURATION);
        }
      }, (error: HttpErrorResponse) => {
        this.snackbarService.openErrorSnackBar(error.message);
      })
    );
  }
}
