import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { environment } from 'src/environments/environment';

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
  commentMode = false;

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private router: Router,
    private alertify: AlertifyService
  ) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.loadPosts();
    this.socket.on('refreshPage', (data) => {
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getAllPosts()
      .subscribe(data => {
        this.posts = data.posts;
      },
        err => {
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

  commentToggle(post) {
    this.commentMode = true;
  }

  cancelCommentMode(commentMode: boolean) {
    this.commentMode = commentMode;
  }

}
