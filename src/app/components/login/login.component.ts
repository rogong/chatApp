import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  loginUser() {
    this.showSpinner = true;

    this.authService.loginUser(this.loginForm.value)
      .subscribe(data => {
        this.tokenService.SetToken(data.token);
        this.loginForm.reset();
        setTimeout(() => {
          this.router.navigate(['events']);
        }, 2000);
        this.alertify.success('Login succesful');
      },
        err => {
          this.showSpinner = false;
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        });
  }

}
