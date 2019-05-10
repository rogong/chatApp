import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import io from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  socketUrl = environment.baseUrlSocket;
  socket: any;
  users: any;
  logedInUser: any;
  userArr = [];

  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    this.logedInUser = this.tokenService.GetPayload();
    this.loadUsers();
    this.loadUser();
    this.socket.on('refreshPage', (data) => {
      this.loadUsers();
      this.loadUser();
    });
  }

  loadUsers() {
    this.userService.getAllUsers()
      .subscribe(data => {
        _.remove(data.result, { username: this.logedInUser.username });
        this.users = data.result;

      });
  }

  loadUser() {
    this.userService.getUserById(this.logedInUser._id)
      .subscribe(data => {
        this.userArr = data.result.following;
      });
  }

  followUser(user) {
    this.userService.followUser(user._id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      });
  }

  viewUser(user) {
    this.router.navigate([user.username]);
    if (this.logedInUser.username !== user.username) {
      console.log(user.username);
      this.userService.profileNotifications(user._id)
        .subscribe(data => {
          this.socket.emit('refresh', {});
        }, err => console.log(err));
    }
  }

  checkInArray(arr, id) {
    const result = _.find(arr, ['userFollowed._id', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

}
