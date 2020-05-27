import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];

  failed = false;

  authForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  public tryRegister() {
    const username = this.authForm.get('username').value;
    const password = this.authForm.get('password').value;
    this.authService.register(username, password).then((user) => {
      this.failed = false;
      if (!this.failed) { this.router.navigate(['/app']); }
    }).catch(err => {
      this.failed = true;
    });
  }

}
