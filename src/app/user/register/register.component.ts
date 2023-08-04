import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  age: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmPassword: FormControl = new FormControl('', [
    Validators.required
  ]);
  phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);

  resgisterForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  });

  showAlert: boolean = false;
  inSubmission: boolean = false;
  alertColor: string = 'blue';
  alertMessage: string = 'Please wait! Your account is being created.';

  constructor(private authService: AuthService) { }

  async register(): Promise<void> {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMessage = 'Please wait! Your account is being created.';
    this.inSubmission = true;
    try {
      await this.authService.createUser(this.resgisterForm.value);
    } catch (error) {
      this.alertMessage = 'An unecpected error occured. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMessage = 'Success your account has been created';
    this.alertColor = 'green';
  }
}
