import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Word } from '../database/Word';
import { WordsDbService } from '../database/words-db.service';
import { TestResultPage } from '../test-result/test-result.page';
import { MenuPage } from '../menu/menu.page';
import { NavController, IonNav } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TestPage implements OnInit {
  answer : string;
  Words : Word[] = [];
  testWords : Word[] = [];
  wordsInTest = 10;
  counter : number = 0;
  start = 0;
  end = 1;
  TIME_IN_MS = 4000;
  correctArticle : string;
  articleM  : string;
  articleF : string;
  hidden : boolean = true;
  Myanswer = "Cool"

  constructor(private wrdService: WordsDbService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.fetchWords();
    let bookingRes = this.wrdService.getWords();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Words = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a!['$key'] = item.key;
        this.Words.push(a as Word);
        let index: number = 0;
        for(let c: number = 0; c < this.wordsInTest; c++)
        {
          index = Math.floor(Math.random() * this.Words.length)
          this.testWords[c] = this.Words[index];
        }
        this.changeArticle()
      })
    })
  }

  displayArticle() {
      document.getElementById("article")!.hidden = false;
  }
    
  fetchWords() {
    this.wrdService.getWords().valueChanges().subscribe(res =>{console.log(res)})
  }

  isCorrect(button_id : string, gender : string){
    if(gender == "M")
      this.correctArticle = this.articleM;
    else
      this.correctArticle = this.articleF;
    if(button_id == "M" && gender == "M"){
      document.getElementById("answer")!.hidden = false;
      document.getElementById("answer")!.setAttribute("color", "success");
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.answer = "Correct!";
      document.getElementById(button_id)!.setAttribute("color", "success");
      setTimeout(() => {this.changeArticle(); this.counter++; this.start++; this.end++;}, this.TIME_IN_MS)
    }
    else if(button_id == "F" && gender == "F"){
      document.getElementById("answer")!.hidden = false;
      document.getElementById("answer")!.setAttribute("color", "success")
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.answer = "Correct!";
      document.getElementById(button_id)!.setAttribute("color", "success");
      setTimeout(() => {this.changeArticle(); this.counter++; this.start++; this.end++;}, this.TIME_IN_MS)
    }
    else{
      document.getElementById("answer")!.hidden = false;
      document.getElementById("answer")!.setAttribute("color", "danger")
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.answer = "Wrong!";
      document.getElementById(button_id)!.setAttribute("color", "danger");
      setTimeout(() => {this.changeArticle(); this.start++; this.end++;}, this.TIME_IN_MS)
    }
}

  toTestResult(){
    this.router.navigate(['test-result',  { value: this.counter }]);
  }

  changeArticle()
  {
    if(Math.floor(Math.random() * 2) == 0){
      this.articleM = "Un ";
      this.articleF = "Une ";
    }
    else{
      this.articleM = "Le ";
      this.articleF = "La ";
    }
  }
}


