import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sharedService: SharedService) {
  }

  activeComponent: string = '';

  ngOnInit() {
    this.activeComponent = this.sharedService.activeComponent;
  }

}
