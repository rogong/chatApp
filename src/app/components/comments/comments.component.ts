import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentForm: FormGroup;
  postId: any;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }
  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();
  }

  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators]
    });
  }

  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment)
      .subscribe(data => {
        this.alertify.success('Comment Added Succesfully.');
        this.commentForm.reset();
      });
  }

}
