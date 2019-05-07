import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  following = [];
  followers = [];
  posts = [];
  socket: any;

  constructor(
    private tokenService: TokenService,
    private userService: UsersService
  ) { this.socket = io('http://localhost:3000'); }

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
        console.log(data);
        this.following = data.result.following;
        this.followers = data.result.followers;
        this.posts = data.result.posts;
      }, err => console.log(err));
  }

}
