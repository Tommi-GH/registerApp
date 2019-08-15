import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route : Router, private auth: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      if(this.auth.isAuthenticated()){
        this.route.navigate(["/dashboard"]);
        
      }
    }, 100);
  }

}
