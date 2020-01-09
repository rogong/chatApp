import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  postsTab = false;
  followersTab = false;
  followingTab = false;
  interestTab = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  userPicId: any;
  userPicVersion: any;
  name: any;
  socket: any;
  socketUrl = environment.baseUrlSocket;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
  ) { this.socket = io(this.socketUrl); }

  ngOnInit() {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

    this.route.params.subscribe(params => {
      this.name = params.name;
      this.getUserData(this.name);
    });
    this.socket.on('refreshPage', (data) => {
      this.getUserData(this.name);
    });
  }

  getUserData(name) {
    this.userService.getUserByUserName(name)
      .subscribe(data => {
        //console.log(data.result);
        this.user = data.result;
        this.posts = data.result.posts.reverse();
        this.followers = data.result.followers;
        this.following = data.result.following;
      }, err => console.log(err));
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  unFollowUser(userFollowed) {

  }


  changeTabs(value) {
    if (value === 'posts') {
      this.postsTab = true;
      this.followersTab = false;
      this.followingTab = false;
      this.interestTab = false;
    }

    if (value === 'following') {
      this.postsTab = false;
      this.followersTab = false;
      this.followingTab = true;
      this.interestTab = false;
    }

    if (value === 'followers') {
      this.postsTab = false;
      this.followersTab = true;
      this.followingTab = false;
      this.interestTab = false;
    }

    if (value === 'interests') {
      this.postsTab = false;
      this.followersTab = false;
      this.followingTab = false;
      this.interestTab = true;
    }

  }

}
