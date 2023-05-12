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
import { exists } from 'fs';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TestPage implements OnInit {

  category : string;

  answer : string;
  allWords : Word[] =[];
  testWords : Word[] = [];
  wordsInTest = 3;
  i = 0;
  correctAnswers = 0;
  TIME_IN_MS = 4000;
  correctArticle : string;
  articleM  : string;
  articleF : string;
  choice = false;
  learnIndexMax = 2;
  testEnd = false;

  endingsMale : string[] = ["ment", "eur", "oir", "age", "er", "ier", "on", "gramme", "drome", "cide", "mètre", "scope", "isme", "phone"];
  endingsFemale : string[] =["tion", "ssion", "sion", "ure", "té", "ité", "ance", "ence", "e", "eur", "esse", "ie", "erie", "ette", "ée", "ine", "logie", "phobie", "manie", "thérapie", "nomie", "ite"];
  wordAfterSplit : string [] = [];
  word : string;
  wordEnding : string;
  endingFound = false;

  isClick = false;
  isClick1 = false;
  isAnswerCorrect = false;

  constructor(private wrdService: WordsDbService,
    private route: ActivatedRoute,
    private router: Router,
    private storages : StorageService) {
      this.route.params.subscribe(params => {
      this.category = params['value'];
  });  
  }

  ngOnInit() {
    this.wrdService.getWords(this.category);
    this.fetchWords();
    let wordRes = this.wrdService.getWords(this.category);
    wordRes.snapshotChanges().subscribe(res => {
      res.forEach(item => {
        let a = item.payload.toJSON();
        a!['$key'] = item.key;
        this.allWords.push(a as Word);
      })
      //this.storages.clear()
      this.changeArticles();
      this.initializeTestWordsArray();
    })
  }

  fetchWords() {
    this.wrdService.getWords(this.category).valueChanges().subscribe(res =>{console.log(res)})
  }

  isClickedAny(){
    return this.choice;
  }

  isClicked(){
      return this.isClick;
  }

  isClicked1(){
      return this.isClick1;
  }

  isCorrect(){
    return this.isAnswerCorrect;
  }

  check(choice : string){
    this.choice = true;
    document.getElementById("article")!.hidden = false;
    document.getElementById("answer")!.hidden = false;
    //document.getElementById("answer")!.disa
    if(choice == this.testWords[this.i].gender){
      console.log("True");
      this.answer = "Correct!";
      this.isAnswerCorrect = true;
      //document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.correctAnswers++;
      this.testWords[this.i].learnIndex++;
      this.storages.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      if(this.testWords[this.i].learnIndex == this.learnIndexMax){
        console.log("Ok");
        console.log(this.testWords[this.i].learnIndex);
        this.storages.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      }
      if(choice == 'M'){
        this.correctArticle = this.articleM;
        this.isClick = true;
      }
      else{
        this.correctArticle = this.articleF;
        this.isClick1 = true;
      }
    }
    else{
      console.log("False");
      this.answer = "Wrong!";
      this.isAnswerCorrect = false;
      if(choice == 'M'){
        this.correctArticle = this.articleM;
        this.isClick = true;
      }
      else{
        this.correctArticle = this.articleM;
        this.isClick1 = true;
      }
    }
    //document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
    if(this.endingFound == true){
      this.endingFound = false;
    }
    this.i++;
    if(this.i < this.wordsInTest){
      setTimeout(() => {this.continue();}, this.TIME_IN_MS);
    }
    else
      setTimeout(() => {this.toTestResult();}, this.TIME_IN_MS);
  }

  toTestResult(){
    let navigationExtras: NavigationExtras = {
      state: {
        value: this.correctAnswers,
        testWords: this.testWords
      }
    };
    this.router.navigate(['test-result'], navigationExtras);
  }

  /*toTestResult(){
    this.router.navigate(['test-result',  { value: this.correctAnswers }]);
  }*/

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
    let data : Word;

    for(let i = 0; this.testWords.length < this.wordsInTest; i++)
    {
      data  = await this.storages.getObject(this.allWords[i].word);
      if (data == null){
        console.log("A new word " + this.allWords[i].word);
        this.storages.setObject(this.allWords[i].word, this.allWords[i]);
        this.testWords.push(this.allWords[i]);
      }
      else if(data.learnIndex < this.learnIndexMax){
        this.testWords.push(data);
        console.log("A word has already been in a test " + data.word + " learnIndex " + data.learnIndex);
      }
    }
    console.log(this.testWords);
    if(this.testWords[this.i].gender == 'M')
      this.findEnding(this.endingsMale);
    else
      this.findEnding(this.endingsFemale);
  }
  findEnding(array : string[]){
    for(let i = 0; i < array.length; i++){
    if(this.testWords[this.i].word.endsWith(array[i]) == true){
      this.endingFound = true;
      console.log("Exists");
      this.wordAfterSplit = this.testWords[this.i].word.split(array[i]);
      this.word = this.wordAfterSplit[0];
      this.wordEnding = array[i];
    }
  }
  if(this.endingFound == false){
      console.log("Exception");
      this.word = this.testWords[this.i].word;
    }
  }

  continue(){
    this.choice = false;
    this.isClick = false;
    this.isClick1 = false;
    this.changeArticles();
    if(this.testWords[this.i].gender == 'M')
      this.findEnding(this.endingsMale);
    else
      this.findEnding(this.endingsFemale);
    document.getElementById("article")!.hidden = true;
    document.getElementById("answer")!.hidden = true;
  }
}