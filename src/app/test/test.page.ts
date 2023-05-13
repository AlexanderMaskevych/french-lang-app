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
  word : string;
  wordEnding : string;
  endingFound = false;

  isClick = false;
  isClick1 = false;
  isAnswerCorrect = false;

  articlesWithWords : string[] = [];
  allAnswers: string[] = [];

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
    if(choice == 'M')
      this.isClick = true;
    else
      this.isClick1 = true;
    if(choice == this.testWords[this.i].gender){
      console.log("True");
      this.answer = "Correct!";
      this.isAnswerCorrect = true;
      //document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.correctAnswers++;
      this.testWords[this.i].learnIndex++;
      this.storages.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      if(this.testWords[this.i].learnIndex == this.learnIndexMax){
        console.log("Learned");
        this.storages.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      }
    }
    else{
      console.log("False");
      this.answer = "Wrong!";
      this.isAnswerCorrect = false;
    }
    this.allAnswers[this.i] = this.answer;
    //document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
    this.i++;
    if(this.i < this.wordsInTest)
      setTimeout(() => {this.continue();}, this.TIME_IN_MS);
    else
      setTimeout(() => {this.toTestResult();}, this.TIME_IN_MS);
  }

  toTestResult(){
    let navigationExtras: NavigationExtras = {
      state: {
        value: this.correctAnswers,
        size : this.wordsInTest,
        articlesWithWords: this.articlesWithWords,
        allAnswers : this.allAnswers
      }
    };
    this.router.navigate(['test-result'], navigationExtras);
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
    let data : Word;

    for(let i = 0; this.testWords.length < this.wordsInTest; i++)
    {
      data  = await this.storages.getObject(this.allWords[i].word);
      console.log(data);
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
    this.loadNextWord();
  }

  loadNextWord(){
    if(this.testWords[this.i].gender == 'M'){
      this.correctArticle = this.articleM;
      this.findEnding(this.endingsMale);
    }
    else{
      this.correctArticle = this.articleF;
      this.findEnding(this.endingsFemale);
    }
    this.articlesWithWords[this.i] = this.correctArticle + " " + this.testWords[this.i].word;
  }

  findEnding(array : string[]){
    let wordAfterSplit : string[] = [];

    for(let i = 0; i < array.length; i++){
      console.log("New " + this.testWords[this.i].word);
      if(this.testWords[this.i].word.endsWith(array[i]) == true){
        this.endingFound = true;
        console.log("Exists " + array[i]);
        wordAfterSplit = this.testWords[this.i].word.split(array[i], 1);
        this.word = wordAfterSplit[0];
        this.wordEnding = array[i];
      }
    }
    if(this.endingFound == false){
        console.log("Exception");
        this.word = this.testWords[this.i].word;
      }
      console.log(this.word);
  }

  continue(){
    this.choice = false;
    this.isClick = false;
    this.isClick1 = false;
    this.isAnswerCorrect = false;
    this.changeArticles();
    this.loadNextWord();
  }
}