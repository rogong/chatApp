import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  socketUrl = environment.baseUrlSocket;
  followers = [];
  user: any;
  socket: any;

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

        this.followers = data.result.followers;
      }, err => console.log(err));
  }
}
