import { Injectable } from '@angular/core';
import {User} from "./interfaces/user-interfaces";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  activeComponent: string = '';
  activeUser?: User;

  setActiveComponent(component: string): void {
    this.activeComponent = component;
  }

  setActiveUser(user: User): void {
    this.activeUser = user;
  }
}
