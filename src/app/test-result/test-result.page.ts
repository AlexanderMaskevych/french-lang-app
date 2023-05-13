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
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.page.html',
  styleUrls: ['./test-result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TestResultPage implements OnInit {

  result : number;
  size : number;
  articlesWithWords : string[] = [];
  allAnswers : string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state){
        this.result = this.router.getCurrentNavigation()?.extras?.state?.value;
        this.size = this.router.getCurrentNavigation()?.extras?.state?.size;
        this.articlesWithWords = this.router.getCurrentNavigation()?.extras?.state?.articlesWithWords;
        this.allAnswers = this.router.getCurrentNavigation()?.extras?.state?.allAnswers;
      }
    });
  }

  ngOnInit() {
    this.countScore();
  }
 
  toMenu(){
    this.router.navigate(['menu']);
  }

  toAnswers(){
    let navigationExtras: NavigationExtras = {
      state: {
        articlesWithWords: this.articlesWithWords,
        allAnswers: this.allAnswers
      }
    };
    this.router.navigate(['answers'], navigationExtras);
  }

  countScore(){
    this.result = Math.round((this.result/this.size)*100);
  }
}

