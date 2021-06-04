import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  users: User[];
  usersCopia: User[];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(x => {
      this.users = x;
      this.usersCopia = x;
    })
  }
  filterItems(event) {
    let search: string = event.target.value;
    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.users = this.users
        .filter(i => i.nombre_completo.toLowerCase().includes(search));
    } else {
      this.users = this.usersCopia;
    }

  }

  deleteUser(evente: string) {
    this.users = this.users.filter(x=>x._id!== evente);
    this.usersCopia = this.users.filter(x=>x._id!== evente);
  }
}
