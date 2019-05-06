import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following = [];
  user: any;
  users: any;
  socket: any;

  constructor(
    private tokenService: TokenService,
    private userService: UsersService) {
    this.socket = io('http://localhost:3000');
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
        this.following = data.result.following;
      }, err => console.log(err));
  }

  unFollowUser(user) {
    this.userService.unFollowUser(user._id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      }, err => console.log(err));
  }
}
