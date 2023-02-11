import {Injectable} from '@angular/core';
import {AppSettings} from '../../../app-settings';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginBackendService {

  url = `${AppSettings.URL}singing`;

  constructor(private readonly http: HttpClient) {
  }

  signIn(user: User): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.post<any>(this.url, user, {headers: headers});
  }
}
