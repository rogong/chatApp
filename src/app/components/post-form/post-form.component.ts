import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';
import { PostService } from 'src/app/services/post.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  baseUrl = environment.baseUrl;
  socketUrl = environment.baseUrlSocket;

  imgUrl = this.baseUrl + '/' + 'upload-image';
  socket: any;

  uploader: FileUploader = new FileUploader({
    url: this.imgUrl,
    disableMultipart: true
  });
  postForm: FormGroup;
  selectedFile: any;
  image: any;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socket = io(this.socketUrl);
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
    let body;
    if (!this.selectedFile) {
      body = {
        post: this.postForm.value.post
      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile
      };
    }
    this.postService.addPost(body)
      .subscribe(data => {
        this.socket.emit('refresh', {});
        this.postForm.reset();
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        const filePath = <HTMLInputElement>
          document.getElementById('filePath');
        filePath.value = '';
      }, err => console.log(err));
  }

  // upload() {
  //   if (this.selectedFile) {
  //     this.userService.addImage(this.selectedFile)
  //       .subscribe(data => {
  //         this.socket.emit('refresh', {});
  //         // tslint:disable-next-line:no-angle-bracket-type-assertion
  //         const filePath = <HTMLInputElement>
  //           document.getElementById('filePath');
  //         filePath.value = '';
  //       },
  //         err => console.log(err)
  //       );
  //   }
  // }

  onFileSelected(event) {
    const file: File = event[0];
    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    // tslint:disable-next-line:no-shadowed-variable
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }


}
