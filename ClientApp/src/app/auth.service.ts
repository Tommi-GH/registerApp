import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { User } from './user-settings/user';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  private requestedScopes: string = 'openid profile write:product write:settings read:product';

  auth0 = new auth0.WebAuth({
    clientID: '2a3rzdP6vARY7ZjxwhWrSxytq6yymJaZ',
    domain: 'ttiira.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:5000',
    audience: 'https://api.myregister.com',
    scope: this.requestedScopes
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
        console.log(authResult);

      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    localStorage.setItem('user', JSON.stringify(new User(
      authResult.idTokenPayload.name,
      authResult.idTokenPayload.nickname,
      authResult.idTokenPayload.picture,
      authResult.idTokenPayload.sub,
      authResult.idTokenPayload.updated_at)));
  }

  public logout(auth0Logout:boolean): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('picture');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('user');
    if(auth0Logout){
      this.auth0.logout();
    }
    
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  getAccessToken(): any {
    //TODO: try to renew token if expires
    return localStorage.getItem('access_token');
  }

}
