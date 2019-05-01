import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = [];

  constructor(private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.loadPosts();
    this.socket.on('refreshPage', (data) => {
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getAppPosts()
      .subscribe(data => {
        this.posts = data.posts;
      });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  // likePost(post) {
  //   console.log(post);
  // }

}
