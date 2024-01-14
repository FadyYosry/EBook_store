import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginEmail: string = '';
  loginPassword: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private renderer: Renderer2) {}

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
}
