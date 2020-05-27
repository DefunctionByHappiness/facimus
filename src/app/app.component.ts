import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'facimus';
  private userSubscription: Subscription;

  constructor( private authService: AuthService, private router: Router) {}

  logedIn = false;


  public ngOnInit() {
    this.authService.isIdentified();
    this.authService.user.subscribe((user) => this.logedIn = user);
  }

  public ngOnDestroy() {

  }

  public logOut() {
    this.authService.logout().then((res) => this.router.navigate(['/login']));
  }
}
