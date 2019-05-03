import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import io from 'socket.io-client';
import { MomentService } from 'src/app/services/moment.service';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentForm: FormGroup;
  comments: [];
  postId: any;
  socket: any;
  momentTime: any;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {
    this.socket = io('http://localhost:3000');
  }
  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
    this.getPost();
    this.socket.on('refreshPage', (data) => {
      this.getPost();
    });

  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators]
    });
  }

  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment)
      .subscribe(data => {
        this.socket.emit('refresh', {});
        this.alertify.success('Comment Added Succesfully.');
        this.commentForm.reset();
      });
  }

  getPost() {
    this.postService.getPost(this.postId)
      .subscribe(data => {
        this.comments = data.post.comments.reverse();
      });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

}
