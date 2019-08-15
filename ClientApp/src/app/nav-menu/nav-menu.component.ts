import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  private isExpanded = false;
  private nickname : string;

  constructor(private auth : AuthService){}

  ngOnInit(){
  }

  ngDoCheck(){
    if(!this.nickname && this.auth.isAuthenticated()){
      this.nickname = JSON.parse(localStorage.getItem('user'))['nickname'];
      }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
