import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import * as M from 'materialize-css';
import _ from 'lodash';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  count = [];
  socket: any;
  userData: any;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private alertify: AlertifyService,
    private userService: UsersService
  ) { this.socket = io('http://localhost:3000'); }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.getUser();
    this.socket.on('refreshPage', (data) => {
      this.getUser();
    });
    const dropDownElem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElem, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
    this.socket.emit('online', { room: 'global', user: this.user.username });

  }

  ngAfterViewInit() {
    this.socket.on('usersOnline', data => {
      this.onlineUsers.emit(data);
    });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
    this.alertify.message('You have logged out');

  }

  getUser() {
    this.userService.getUserById(this.user._id)
      .subscribe(data => {
        this.userData = data.result;
        this.notifications = data.result.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
      },
        err => {
          if (err.error.token === null) {
            this.tokenService.DeleteToken();
            this.router.navigate(['']);
            this.alertify.error('Token expired, login again.');
          }
        });
  }

}
