import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientApiService } from 'src/app/shared/http/http-client-api.service';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClientApi: HttpClientApiService) {}

  /**
   * Login user
   * @param payload Login Model
   */
  login(payload: Login): Observable<any> {
    return this.httpClientApi.post('auth/login', payload);
  }
}
