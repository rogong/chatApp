import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  socket: any;
  postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  submitPost() {
    this.postService.addPost(this.postForm.value)
      .subscribe(data => {
        this.socket.emit('refresh', {});
        this.postForm.reset();
      });
  }

}
