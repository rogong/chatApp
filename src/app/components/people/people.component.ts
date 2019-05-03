import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users: any;
  logedInUser: any;

  constructor(private userService: UsersService, private tokenService: TokenService) { }

  ngOnInit() {
    this.logedInUser = this.tokenService.GetPayload();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers()
      .subscribe(data => {
        _.remove(data.result, { username: this.logedInUser.username });
        this.users = data.result;

      });
  }

}
