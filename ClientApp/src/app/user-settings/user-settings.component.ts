import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from './user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  private user : User;
  constructor(private auth : AuthService ) { }

  ngOnInit() {
    this.getUserInfo()
  }
  getUserInfo(): any {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  

}
