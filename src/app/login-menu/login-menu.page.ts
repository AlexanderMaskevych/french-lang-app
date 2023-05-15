import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthService } from '../database/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.page.html',
  styleUrls: ['./login-menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginMenuPage{

  submitted = false;
  user = { email: '', password: '' };

  constructor(private router: Router,
    private authService: AuthService) {}

    onLogin(form: NgForm): void {
      if (form.valid) {
        this.authService.loginWithEmail({ email: form.control.value.email, password: form.control.value.password });
      }
    }
  
    resetPassword(email: string): void {
      this.authService.resetPassword(email);
    }
  
    googleAuth(): void {
      this.authService.googleLogin();
    }
  
  
    onSignup(): void {
      this.router.navigateByUrl('/registration');
    }

  toMenu(){
    this.router.navigate(['menu']);
  }

}
