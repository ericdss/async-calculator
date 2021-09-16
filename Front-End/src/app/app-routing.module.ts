import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', component: CalculatorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'home', component: CalculatorComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
