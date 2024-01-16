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
  signupForm: FormGroup;
  showPassword: boolean = false;
  currentForm: 'login' | 'signup' = 'login';

  constructor(private renderer: Renderer2, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: [
        '',
        [Validators.required, Validators.minLength(5), this.passwordValidator],
      ],
    });

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      signupEmail: ['', [Validators.required, Validators.email]],
      signupPassword: [
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

  submitSignUpForm() {
    if (this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const email = this.signupForm.get('signupEmail')?.value;
      const password = this.signupForm.get('signupPassword')?.value;

      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Password:', password);
      alert('SignUp Successfuly ❤️');
    }
  }
}
