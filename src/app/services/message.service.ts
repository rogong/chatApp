import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  sendMessage(senderId, receiverId, receiverName, message): Observable<any> {

    return this.http.post(`${this.baseUrl}/chat-messages/${senderId}/${receiverId}`, {
      receiverId, receiverName, message
    });
  }

  getAllMessages(senderId, receiverId): Observable<any> {

    return this.http.get(`${this.baseUrl}/chat-messages/${senderId}/${receiverId}`);
  }


}
