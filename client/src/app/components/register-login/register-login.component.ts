import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  userStatus: string = 'register';

  regStatus: boolean = false;
  authStatus: boolean = false;
  displayError: boolean = false;

  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) {
    this.registerForm = this.fb.group({
      registerName: ['', Validators.required],
      registerPassword: ['', Validators.required],
      age: ['', Validators.required],
      family: ['', Validators.required],
      race: ['', Validators.required],
      food: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      loginName: ['', Validators.required],
      loginPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void { }

  onSwitch() {
    if(this.userStatus === 'register') {
      this.userStatus = 'login';
      this.regStatus = false;
      console.log(this.userStatus);
    } else if (this.userStatus === 'login') {
      this.userStatus = 'register';
      console.log(this.userStatus);
    }
  }

  onSubmitRegister() {
    if(this.registerForm.valid) {
      const registerName = this.registerForm.get('registerName')?.value;
      const registerPassword = this.registerForm.get('registerPassword')?.value;
      const age = this.registerForm.get('age')?.value;
      const family = this.registerForm.get('family')?.value;
      const race = this.registerForm.get('race')?.value;
      const food = this.registerForm.get('food')?.value;
      const data = {
        name: registerName,
        password: registerPassword,
        age: age,
        family: family,
        race: race,
        food: food
      }
      this.authService.register(data)
        .subscribe(response => {
          this.regStatus = this.authService.isReg;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    } else {
      console.log('There is a problem with the form, houba !');
    }
  }

  onSubmitLogin() {
    if(this.loginForm.valid) {
      const loginName = this.loginForm.get('loginName')?.value;
      const loginPassword = this.loginForm.get('loginPassword')?.value;
      const data = {
        name: loginName,
        password: loginPassword
      }
      this.authService.login(data);
    } else {
      console.log('There is a problem with the form, houba !');
    }
  }
}
