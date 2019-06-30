import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/Post';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  addPost(body): Observable<any> {

    return this.http.post(`${this.baseUrl}/post/add-post`, body);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  addLike(body): Observable<any> {

    return this.http.post(`${this.baseUrl}/post/add-like`, body);
  }

  addComment(postId, comment): Observable<any> {

    return this.http.post(`${this.baseUrl}/post/add-comment`, {
      postId, comment
    });
  }

  getPost(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${id}`);
  }

  updatePost(postId: string, body) {
    return this.http.put(`${this.baseUrl}/post/update-post/${postId}`, body);
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.baseUrl}/delete-post/${postId}`);
  }
}
