import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socketUrl = environment.baseUrlSocket;
  user: any;
  socket: any;
  notifications = [];

  constructor(
    private tokenService: TokenService,
    private userService: UsersService) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', (data) => {
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUserById(this.user._id)
      .subscribe(data => {
        this.notifications = data.result.notifications.reverse();
      }, err => console.log(err));
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  markNotification(notification) {
    this.userService.markNotification(notification._id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      });
  }

  deleteNotification(notification) {
    this.userService.markNotification(notification._id, true)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      });
  }

  markAllAsRead() {
    this.userService.markAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

}
