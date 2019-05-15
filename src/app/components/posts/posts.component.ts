import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import * as M from 'materialize-css';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socketUrl = environment.baseUrlSocket;

  socket: any;
  posts = [];
  user: any;
  userArr: [];
  postArr = [];
  commentMode = false;
  showSpinner = false;

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private userService: UsersService,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    const dropDownElem = document.querySelector('.dropdown');
    M.Dropdown.init(dropDownElem, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
    this.user = this.tokenService.GetPayload();
    console.log(this.user);
    this.loadPosts();
    this.loadUser();
    this.socket.on('refreshPage', (data) => {
      this.loadPosts();
      this.loadUser();
    });
  }

  loadUser() {
    this.userService.getUserById(this.user._id)
      .subscribe(data => {
        this.userArr = data.result.following;
      });
  }

  loadPosts() {
    this.showSpinner = true;
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts = data.posts;
        console.log(this.posts);
        this.showSpinner = false;
      },
        err => {
          this.showSpinner = false;
          if (err.error.token === null) {
            this.tokenService.DeleteToken();
            this.router.navigate(['']);
            this.alertify.error('Token expired, login again.');
          }
        }
      );
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  likePost(post) {
    this.postService.addLike(post)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      }, err => console.log(err));
  }

  openCommentPost(post) {

    this.router.navigate(['post', post._id]);
  }

  checkInLikesArray(arr, username) {
    // tslint:disable-next-line:object-literal-shorthand
    return _.some(arr, { username: username });
  }

  // commentToggle(post) {
  //   this.commentMode = true;
  // }

  // cancelCommentMode(commentMode: boolean) {
  //   this.commentMode = commentMode;
  // }

  viewUser(user) {
    this.router.navigate([user.username]);
    if (this.user.username !== user.username) {
      this.userService.profileNotifications(user._id)
        .subscribe(data => {
          this.socket.emit('refresh', {});
        }, err => console.log(err));
    }
  }

  checkUserInArray(arr, id) {
    const result = _.find(arr, ['userFollowed', id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  unFollowUser(user) {
    this.userService.unFollowUser(user._id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      }, err => console.log(err));
  }

  postOwner(postusername, username) {
    const result = _.eq(postusername, username);
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(id) {
    this.showSpinner = true;
    this.postService.deletePost(id)
      .subscribe(data => {
        this.socket.emit('refresh', {});
        this.showSpinner = false;
        this.alertify.success('Deletion successful!');
      },
        err => {
          if (err.error.token === null) {
            this.showSpinner = false;
            this.tokenService.DeleteToken();
            this.alertify.error('Token expired, login again.');
          }
        });
  }

}
