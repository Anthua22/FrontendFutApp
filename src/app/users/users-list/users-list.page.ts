import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  users:User[];
  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(x=>{
      this.users = x;
    })
  }

}
