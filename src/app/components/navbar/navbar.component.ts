import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.token = this.tokenService.GetToken();
    console.log(this.token);
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);

  }

}
