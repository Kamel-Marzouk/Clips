import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

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
  alertMessage: string = 'You are logged in successfully';

  login(): void {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'You are logged in successfully';
  }
}
