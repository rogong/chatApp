import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserById(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  getUserByUserName(username): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${username}`);
  }

  followUser(id): Observable<any> {
    return this.http.post(`${this.baseUrl}/follow-user`, {
      userFollowed: id
    });
  }

  unFollowUser(id): Observable<any> {
    return this.http.post(`${this.baseUrl}/unfollow-user`, {
      userFollowed: id
    });
  }
}
