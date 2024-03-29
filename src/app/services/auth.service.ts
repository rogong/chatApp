import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  registerUser(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, body);
  }

  loginUser(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
