import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  signupUser() {
    this.showSpinner = true;
    this.authService.registerUser(this.signupForm.value)
      .subscribe(data => {
        this.tokenService.SetToken(data.token);
        this.signupForm.reset();
        // setTimeout(() => {
          this.router.navigate(['login']);
       // }, 1000);
        this.alertify.success('Signup succesful, login to continue.');
      },
        err => {
          this.showSpinner = false;
          if (err.error.msg) {
            this.errorMessage = err.error.msg[0].message;
          }

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        });
  }

}
