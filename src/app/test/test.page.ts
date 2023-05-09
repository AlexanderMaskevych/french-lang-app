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
  answer : string;
  allWords : Word[] =[];
  testWords : Word[] = [];
  wordsInTest = 10;
  i = 0;
  word : string;
  correctAnswers = 0;
  TIME_IN_MS = 4000;
  correctArticle : string;
  articleM  : string;
  articleF : string;
  choice = false;
  learnIndexMax = 2;
  testEnd = false;

  suffixesMale : string[] = ["ment", "eur", "oir", "age", "er", "ier", "on", "gramme", "drome", "cide", "mètre", "scope", "isme", "phone"];
  suffixesFemale : string[] =["tion", "ssion", "sion", "ure", "té", "ité", "ance", "ence", "e", "eur", "esse", "ie", "erie", "ette", "ée", "ine", "logie", "phobie", "manie", "thérapie", "nomie", "ite"];
  wordWithoutSuffix : string [] = [];
  wordSuffix : string;
  category : string;
  endingExistence = false;

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

  isCorrect(choice : string){
    document.getElementById("article")!.hidden = false;
    if(choice == this.testWords[this.i].gender){
      console.log("True");
      this.answer = "Correct!";
      document.getElementById("answer")!.setAttribute("color", "success");
      document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
      this.correctAnswers++;
      this.testWords[this.i].learnIndex++;
      if(this.testWords[this.i].learnIndex == this.learnIndexMax){
        console.log("Ok");
        console.log(this.testWords[this.i].learnIndex);
        this.storages.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      }
      if(choice == 'M'){
        //this.divideWord(this.suffixesMale);
        this.correctArticle = this.articleM;
        document.getElementById("masculin")!.setAttribute("color", "success");
      }
      else{
        //this.divideWord(this.suffixesFemale);
        this.correctArticle = this.articleF;
        document.getElementById("feminin")!.setAttribute("color", "success");
      }
    }
    else{
      console.log("False");
      this.answer = "Wrong!";
      document.getElementById("answer")!.setAttribute("color", "danger")
      if(choice == 'M')
        document.getElementById("masculin")!.setAttribute("color", "danger");
      else
        document.getElementById("feminin")!.setAttribute("color", "danger");
    }
    document.getElementById("animate")!.setAttribute("class", "animate__bounceIn");
    document.getElementById("suffix")!.setAttribute("color", "danger");
    this.choice = true;
    this.i++;
    if(this.i < this.wordsInTest){
      this.isThereEnding();
      setTimeout(() => {this.changeArticles(); this.choice = false}, this.TIME_IN_MS);
    }
    else
      this.testEnd = true;
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
    let data : Word;

    for(let i = 0; i < this.wordsInTest; i++)
    {
      data  = await this.storages.getObject(this.allWords[i].word);
      if (data == null){
        console.log("A new word " + this.allWords[i].word);
        this.storages.setObject(this.allWords[i].word, this.allWords[i]);
        this.testWords.push(this.allWords[i]);
      }
      else if(data.learnIndex < this.learnIndexMax){
        this.testWords.push(data);
        console.log("A word has already been in a test " + data.word);
      }
    }
    this.word = this.testWords[this.i].word;
    this.isThereEnding();
  }
  isThereEnding(){
    let i;
      if(this.testWords[this.i].gender == "M"){
        console.log("Male");
        console.log(this.suffixesMale.length);
        for(i = 0; i < this.suffixesMale.length; i++){
        if(this.testWords[this.i].word.endsWith(this.suffixesMale[i]) == true){
          this.endingExistence = true;
          console.log("Exists");
          this.wordWithoutSuffix = this.testWords[this.i].word.split(this.suffixesMale[i]);
          console.log(this.wordWithoutSuffix);
          this.wordSuffix = this.suffixesMale[i];
          console.log(this.wordSuffix); 
        }
      }
      if(this.endingExistence == false){
          console.log("Exception");
          this.wordWithoutSuffix.push(this.testWords[this.i].word);
          this.word = this.wordWithoutSuffix[0];
          console.log(this.word);
        }
      }
      else{
        console.log("Female");
        console.log(this.suffixesFemale.length);
        for(i = 0; i < this.suffixesFemale.length; i++){
        if(this.testWords[this.i].word.endsWith(this.suffixesFemale[i])){
          console.log("Exists");
          this.wordWithoutSuffix = this.testWords[this.i].word.split(this.suffixesFemale[i]);
          console.log(this.wordWithoutSuffix);
          this.wordSuffix = this.suffixesFemale[i];
          console.log(this.wordSuffix);
        }
      }
      if(this.endingExistence == false){
        console.log("Exception");
        this.wordWithoutSuffix.push(this.testWords[this.i].word);
        this.word = this.wordWithoutSuffix[0];
        console.log(this.word);
      }
    }
  }
}