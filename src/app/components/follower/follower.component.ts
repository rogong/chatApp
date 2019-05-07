import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';


@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  followers = [];
  user: any;
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

        this.followers = data.result.followers;
      }, err => console.log(err));
  }
}
