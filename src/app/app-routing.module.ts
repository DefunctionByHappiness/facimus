import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'app' },
{ path: 'app', component: HomeComponent , canActivate: [AuthGuardService] },
{ path: 'login', component: LogInComponent },
{ path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
