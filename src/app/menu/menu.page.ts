import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../database/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WordsDbService } from '../database/words-db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MenuPage implements OnInit {

  isLoggedIn = false;
  category : string;
  categories: string[] = ["Body", "Animals", "Food"];

  constructor(public authService: AuthService, private router: Router, public ngFireAuth: AngularFireAuth) {
   }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  toTest(category : string){
    this.router.navigate(['/test', { value: category }]);
  }

  Show1() {
    //this.router.navigate(['/home']);
  }
  
  Show2() {
    this.router.navigate(['/registration']);
  }

  Show3() {
    this.authService.logout();
  }

}

