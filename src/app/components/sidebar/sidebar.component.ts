import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
  }

}
