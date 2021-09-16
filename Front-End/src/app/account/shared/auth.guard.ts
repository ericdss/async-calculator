import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean
  {
    const token = window.localStorage.getItem('token');

    if(token) {
      const decodedString = atob(token.split('.')[1]);
      const decodedToken = JSON.parse(decodedString);
      var current_time = new Date().getTime() / 1000;
	    if (current_time > decodedToken.exp) { 
        // expired
        window.localStorage.removeItem('token');
        alert('Access expired. Please enter your credentials again');
        this.router.navigate(['login']);
      }

      return true;
    }
    else {
      this.router.navigate(['login']);
      return false
    }
  }
  
}