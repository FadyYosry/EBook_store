import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginForm: FormGroup;
  loginEmail: string = '';
  loginPassword: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  firstName: string = '';
  lastName: string = '';
  signupEmail: string = '';
  signupPassword: string = '';
  currentForm: 'login' | 'signup' = 'login';

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: [
        '',
        [Validators.required, Validators.minLength(5), this.passwordValidator],
      ],
    });
  }

  passwordValidator(control: AbstractControl) {
    if (control.value) {
      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);

      const valid = hasUpperCase && hasLowerCase;

      return valid ? null : { invalidPassword: true };
    }

    return null;
  }

  //show password func
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    const passwordInput = this.passwordInput.nativeElement;

    if (this.showPassword) {
      this.renderer.setProperty(passwordInput, 'type', 'text');
    } else {
      this.renderer.setProperty(passwordInput, 'type', 'password');
    }
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('loginEmail')?.value;
      const password = this.loginForm.get('loginPassword')?.value;

      console.log('Email:', email);
      console.log('Password:', password);
    }
  }

  submitSignUpForm() {}
}
