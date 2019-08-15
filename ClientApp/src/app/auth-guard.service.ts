import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth : AuthService, public router : Router) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{

    if(route.routeConfig.path === "" ){
      if(this.auth.isAuthenticated()){
        this.router.navigate(['/dashboard']);
        return false;
      }else{
        return true;
      }
    };

    if(route.routeConfig.path === "admin" ){
      if(!this.auth.userHasScopes(['write:settings'])){
        this.router.navigate(['/forbidden']);
        return false;
      }else{
        return true;
      }
    };

    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/forbidden']);
      return false;
    }
    return true;
  }
}
