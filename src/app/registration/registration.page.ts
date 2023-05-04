import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../database/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrationPage {

  signup = { email: '', password: '' };
  submitted = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSignup(form: NgForm) {
    if (form.valid) {
      this.authService.signUpWithEmail({ email: form.control.value.email, password: form.control.value.password})
    }
  }
}
