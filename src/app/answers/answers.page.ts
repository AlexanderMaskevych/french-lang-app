import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AnswersPage implements OnInit {

  articlesWithWords : string[] = [];
  allAnswers : string[] = [];
  items : Object [] = [];
  resultBool: boolean[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) 
        this.articlesWithWords = this.router.getCurrentNavigation()?.extras?.state?.articlesWithWords;
        this.allAnswers = this.router.getCurrentNavigation()?.extras?.state?.allAnswers;
    });
  }

  ngOnInit() {
    this.compare();
    for(let i = 0; i < this.articlesWithWords.length; i++){ 
      let result = {
        word: this.articlesWithWords[i],
        resultBool: this.resultBool[i],
        result: this.allAnswers[i],
      };
      this.items.push(result);
    }
  }

  compare(){
    for(let i = 0; i < this.allAnswers.length; i++)
      if(this.allAnswers[i] === 'Correct!'){
        this.resultBool[i] = true;
      }
      else
        this.resultBool[i] = false;
  }
}
