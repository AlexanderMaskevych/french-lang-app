import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Word } from '../database/Word';
import { WordsDbService } from '../database/words-db.service';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { learntWord } from '../local_storage/learnt_word';
import { StorageService } from '../storage.service';
import { HttpClient} from '@angular/common/http';

import {learntWords } from './data';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TestPage implements OnInit {
  answer : string;
  allWords : any[] =[];
  testWords : Word[] = [];
  learntWords : any[] = [];
  wordsInTest = 10;
  i = 0;
  correctAnswers = 0;
  word : string;
  TIME_IN_MS = 4000;
  correctArticle : string;
  articleM  : string;
  articleF : string;
  choice = false;
  learnIndex = 2;
  name : string;
  data : any;
  

  constructor(private wrdService: WordsDbService,
    private route: ActivatedRoute,
    private router: Router,
    private storages : StorageService) {
      
  }

  ngOnInit() {
    this.fetchWords();
    let bookingRes = this.wrdService.getWords();
    bookingRes.snapshotChanges().subscribe(res => {
      this.allWords = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a!['$key'] = item.key;
        this.allWords.push(a as Word);
      })
      this.changeArticles();
      this.initializeTestWordsArray();
    })
  }

  displayArticle() {
      document.getElementById("article")!.hidden = false;
  }
    
  fetchWords() {
    this.wrdService.getWords().valueChanges().subscribe(res =>{console.log(res)})
  }

  isCorrect(choice : string){
    this.choice = true;
    if(this.testWords[this.i].gender == choice)
      this.correctArticle = this.articleM;
    else
      this.correctArticle = this.articleF;
    if(choice == this.testWords[this.i].gender){
      this.answer = "Correct!";
      console.log("True");
      this.testWords[this.i].learnIndex++;
      /*document.getElementById("answer")!.setAttribute("color", "success");
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      document.getElementById("masculin")!.setAttribute("color", "success");*/
      this.correctAnswers++;
      if(this.testWords[this.i].learnIndex == this.learnIndex){
        console.log("Ok");
        this.storages.set(this.testWords[this.i].word, this.testWords[this.i].word);
      }
    }
    else{
      this.answer = "Wrong!";
      console.log("False");
      /*document.getElementById("answer")!.setAttribute("color", "danger")
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");*/
      //document.getElementById(button_id)!.setAttribute("color", "danger");
    }
    this.choice = true;
    this.i++;
    setTimeout(() => {this.word = this.testWords[this.i].word; this.changeArticles(); this.choice = false}, this.TIME_IN_MS);
}

  toTestResult(){
    this.router.navigate(['test-result',  { value: this.correctAnswers }]);
  }

  changeArticles()
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

  async initializeTestWordsArray(){
    let index : number;
    let data : any;
    //Randomize allWords array
    for(let i = 0; i < this.allWords.length; i++)
    {
      index = Math.floor(Math.random() * this.allWords.length)
      this.allWords[i]= this.allWords[index];
    }
    for(let c = 0; c < this.wordsInTest; c++){
      //Check if a word from the database with a random index is in the Ionic Storage
      data  = await this.storages.get(this.allWords[c].word);
      if (data == null){
        console.log("True")
        console.log(this.data);
        this.testWords.push(this.allWords[c]);
        console.log( this.testWords[c]);
      }
      else
        console.log("The word " + data + "is already in storage!")
      //Next word
    }
    console.log(this.testWords.length);
    //Sort the testWords array in ascending order using the frequencyIndex key
    this.testWords = this.testWords.sort(function(a, b){return a.frequencyIndex - b.frequencyIndex;});
    this.word = this.testWords[this.i].word;
  }
}