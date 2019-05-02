import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();

  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
    this.alertify.message('You have logged out');

  }

}
