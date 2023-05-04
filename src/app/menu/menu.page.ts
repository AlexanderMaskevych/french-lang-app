import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../database/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MenuPage implements OnInit {

  loggedIn = true;

  constructor(public authService: AuthService, private router: Router, public ngFireAuth: AngularFireAuth, ) {
   }

  ngOnInit() {}

  toTest(){
    this.router.navigate(['/test']);
  }

  Show1() {
    this.loggedIn = true;
    this.router.navigate(['/home']);
  }
  Show2() {
    this.loggedIn = false;
    this.authService.logout;
  }
  Show3() {
    this.loggedIn = true;
    this.router.navigate(['/registration']);
  }

}

