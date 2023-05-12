import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TestPage } from '../test/test.page';
import { MenuPage } from '../menu/menu.page';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavController, IonNav, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

import { Word } from '../database/Word';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.page.html',
  styleUrls: ['./test-result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TestResultPage implements OnInit {

  result : number;
  testWords : Word[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.result = this.router.getCurrentNavigation()?.extras?.state?.value;
        this.testWords = this.router.getCurrentNavigation()?.extras?.state?.testWords;
      }
      //this.result = Math.round((this.result/10)*100);
    });
  }
  ngOnInit() {
  }
 
  toMenu(){
    this.router.navigate(['menu']);
  }

  toAnswers(){
    this.router.navigate(['answers']);
  }
}

