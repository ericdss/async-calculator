import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  constructor(private router: Router, private authsService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    try {
      this.authsService.register(this.user)
      .pipe(
        catchError(this.serviceError)
      )
      .subscribe(
        data => {
          alert('Account created successfully');
          this.router.navigate(['login']);
        },
        error => {
          alert('Error to create account. Please try again');
          console.error(error);
        });
    }
    catch (error) {
      console.error(error)
    }
  }

  serviceError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error instanceof HttpErrorResponse) {

        errMsg = `${error.status} - ${error.message || ''}`;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return throwError(errMsg);
}

}
