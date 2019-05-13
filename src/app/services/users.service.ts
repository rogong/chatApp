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

  getAllRecommendedUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recommended-users`);
  }

  getUserById(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  getUserByUserName(username): Observable<any> {
    return this.http.get(`${this.baseUrl}/username/${username}`);
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

  markNotification(id, deleteValue?): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark/${id}`, { id, deleteValue });
  }

  markAllAsRead() {
    return this.http.post(`${this.baseUrl}/mark-all`, { all: true });
  }

  addImage(image): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload-image`, { image });
  }

  setProfileImage(imageId, imageVersion): Observable<any> {
    return this.http.get(`${this.baseUrl}/set-default-image/${imageId}/${imageVersion}`);
  }

  profileNotifications(id): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/view-profile`, { id });
  }

  changePassword(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, body);
  }

}
