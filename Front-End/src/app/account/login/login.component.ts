import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    try {
      const signIn = await this.authService.login(this.user);
      if(signIn)
      {
        alert('Sign In successfully!');
        this.router.navigate(['home']);
      }
      else
        alert('Email or password invalid. Try again');
    }
    catch (error) {
      console.log(error)
    }
  }

}
