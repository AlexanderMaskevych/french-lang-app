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

  loggedIn = true;
  category : string;
  categories: string[] = ["Body", "Animals", "Food"];

  constructor(public authService: AuthService, private router: Router, public ngFireAuth: AngularFireAuth, ) {
   }

  ngOnInit() {}

  toTest(category : string){
    /*for(let i = 0; i < this.categories.length; i++){
    if(category == this.categories[i])
      this.category = this.categories[i];
    }*/
    //this.category = "Body";
    this.router.navigate(['/test', { value: category }]);
  }

  Show1() {
    //this.authService.appUser$
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

