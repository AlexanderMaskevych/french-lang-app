import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})

export class HomePage {

  ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user')!);
  console.log(user); 
}

  constructor(private router: Router) {}

  toMenu(){
    this.router.navigate(['menu']);
  }
}

