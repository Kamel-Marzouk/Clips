import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);

  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMessage: string = 'Please wait! We are logging you in.';
  inSubmission: boolean = false;

  constructor(private fireAuth: AngularFireAuth) {}

  async login() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! We are logging you in.';
    this.inSubmission = true;
    try {
      await this.fireAuth.signInWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMessage =
        'An unecpected error occured. Please try again later.';
      this.alertColor = 'red';
      return;
    }
    this.alertColor = 'green';
    this.alertMessage = 'Success! You are now logged in.';
  }
}
