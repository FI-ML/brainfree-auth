import {Injectable} from '@angular/core';
import {AppSettings} from '../../../app-settings';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../models/user/user';
import {Token} from '../../../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginBackendService {

  url = `${AppSettings.URL}singing`;

  constructor(private readonly http: HttpClient) {
  }

  signIn(user: User): Observable<Token> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.post<Token>(this.url, user, {headers: headers});
  }
}
