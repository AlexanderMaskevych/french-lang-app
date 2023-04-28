import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from "../database/authentication-service";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MenuPage implements OnInit {

  loggedIn : boolean = false

  constructor(public authService: AuthenticationService, private router: Router, public ngFireAuth: AngularFireAuth, ) {
   }

  ngOnInit() {
    //window.location.reload();
    //this.ngFireAuth.onAuthStateChanged((user) => {
      /*if (user) 
        this.display = true;*/
        //this.ngFireAuth.currentUser
        //this.authService.SignOut();
        //const user = JSON.parse(localStorage.getItem('user')!);
        //console.log(user);
        //const user = JSON.parse(localStorage.getItem('user')!);
       /* user
      } else {
        this.display = false;
      }*/
    //});
    //console.log(this.display);
    //const user = firebase.auth().currentUser;
let answer = this.authService.isLoggedIn
if (answer) {
  //console.log(user);
  this.loggedIn = true;
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
} else {
  this.loggedIn = false;
  console.log("No");
  
  // No user is signed in.
}
  }

  toTest(){
    this.router.navigate(['test']);
  }

  Show1() {
    this.loggedIn = true;
    this.router.navigate(['/login']);
  }
  Show2() {
    this.loggedIn = false;
    this.authService.SignOut();
}
Show3() {
  this.loggedIn = true;
  this.router.navigate(['/registration']);
}

}

