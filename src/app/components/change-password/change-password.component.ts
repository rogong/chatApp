import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  cpassword: any;
  newPassword: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.Init();
    this.user = this.tokenService.GetPayload();
  }

  Init() {
    this.passwordForm = this.fb.group({
      cpassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.Validate.bind(this)
      });
  }

  changePassword() {
    this.userService.changePassword(this.passwordForm.value)
      .subscribe(data => {
        console.log(data);
        // this.passwordForm.reset();
      }, err => console.log(err));
  }

  Validate(passwordFormGroup: FormGroup) {
    const newPassword = passwordFormGroup.controls.newPassword.value;
    const confirmPassword = passwordFormGroup.controls.confirmPassword.value;

    if (confirmPassword.length <= 0) {
      return null;
    }

    if (confirmPassword !== newPassword) {
      return {
        doesNotMatch: true
      };
    }
  }

}
