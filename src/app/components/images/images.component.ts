import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  baseUrl = environment.baseUrl;
  socketUrl = environment.baseUrlSocket;

  imgUrl = this.baseUrl + '/' + 'upload-image';

  uploader: FileUploader = new FileUploader({
    url: this.imgUrl,
    disableMultipart: true
  });

  selectedFile: any;
  user: any;
  images = [];
  socket: any;
  imageProfile: any;

  constructor(private userService: UsersService, private tokenService: TokenService) {
    this.socket = io(this.socketUrl);
  }

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
        this.images = data.result.images;
      });
  }
  upload() {
    if (this.selectedFile) {
      this.userService.addImage(this.selectedFile)
        .subscribe(data => {
          this.socket.emit('refresh', {});
          // tslint:disable-next-line:no-angle-bracket-type-assertion
          const filePath = <HTMLInputElement>
            document.getElementById('filePath');
          filePath.value = '';
        },
          err => console.log(err)
        );
    }
  }

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

  setAsProfile(image) {
    this.userService.setProfileImage(image.imgId, image.imgVersion)
      .subscribe(data => {
        this.socket.emit('refresh', {});
      }, err => console.log(err)
      );
  }

}
