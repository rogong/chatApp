import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash';
import io from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-recommended',
  templateUrl: './people-recommended.component.html',
  styleUrls: ['./people-recommended.component.css']
})
export class PeopleRecommendedComponent implements OnInit {
  @Input() users;
  socketUrl = environment.baseUrlSocket;
  socket: any;
  recommendedUsers: any;
  loggedInUser: any;
  userArr = [];
  // isOnline = false;
  // receiver: string;
  // receiverData: any;
  onlineUsers = [];

  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.loadRecommendedUsers();
    this.loadUser();
    this.socket.on('refreshPage', (data) => {
      this.loadRecommendedUsers();
      this.loadUser();
    });
    this.userArr = this.users;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.users.currentValue.length > 0) {
  //     const result = _.indexOf(changes.users.currentValue, this.receiver);
  //     if (result > -1) {
  //       this.isOnline = true;
  //     } else {
  //       this.isOnline = false;
  //     }
  //   }
  // }
  // online(event) {
  //   this.onlineUsers = event;
  // }

  checkIfOnline(name) {
    const result = _.indexOf(this.onlineUsers, name);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }

  loadRecommendedUsers() {
    this.userService.getAllRecommendedUsers()
      .subscribe(data => {
        _.remove(data.result, { username: this.loggedInUser.username });
        this.recommendedUsers = data.result;

      });
  }

  loadUser() {
    this.userService.getUserById(this.loggedInUser._id)
      .subscribe(data => {
        this.userArr = data.result.following;
      });
  }

  // getUserByUsername(name) {
  //   this.userService.getUserByUserName(name)
  //     .subscribe(data => {
  //       this.receiverData = data.result;
  //     });
  // }

  followUser(user) {
    this.userService.followUser(user._id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      });
  }

  viewUser(user) {
    this.router.navigate([user.username]);
    if (this.loggedInUser.username !== user.username) {
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
