import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  failed = false;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  public tryLogin() {
    const username = this.authForm.get('username').value;
    const password = this.authForm.get('password').value;
    this.authService.login(username, password).then((user) => {
      this.failed = false;
      if (!this.failed) { this.router.navigate(['/app']); }
    }).catch((err) => {
      this.failed = true;
    });;
  }
}
