import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { IUser } from '../database/user';
import { AuthService } from '../database/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})

export class HomePage {

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

