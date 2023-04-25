import { Component, OnInit } from '@angular/core';
import { User } from "../interfaces/user-interfaces";
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private sharedService: SharedService) {}

  users: User[] = [
    {
      id: 1,
      name: 'Gabriel Sores Gomes',
      registration: '202110116'
    },
    {
      id: 2,
      name: 'Admin',
    }

  ]

  getUsers(): void {

  }
  ngOnInit(): void {
    this.getUsers();
    this.sharedService.setActiveComponent('users');
  }

}
