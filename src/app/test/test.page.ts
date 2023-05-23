import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Word } from '../database/Word';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../storage.service';

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
  allCategoryWords : Word[] =[];
  testWords : Word[] = [];
  i = 0;
  wordNumber = 1;
  wordsInTest = 7;
  correctAnswers = 0;
  TIME_IN_MS = 3000;
  correctArticle : string;
  articleM  : string;
  articleF : string;
  learnIndexMax = 2;

  endingsMale : string[] = ["ment", "eur", "oir", "age", "er", "ier", "on", "gramme", "drome", "cide", "mètre", "scope", "isme", "phone"];
  endingsFemale : string[] =["tion", "ssion", "sion", "ure", "té", "ité", "ance", "ence", "e", "eur", "esse", "ie", "erie", "ette", "ée", "ine", "logie", "phobie", "manie", "thérapie", "nomie", "ite"];
  word : string;
  wordEnding : string;

  choice = false;
  isClick = false;
  isClick1 = false;
  isAnswerCorrect = false;
  endingFound = false;
  testEnd = false;

  articlesWithWords : string[] = [];
  allAnswers: string[] = [];

  learntWordsCounter = 0;

  description : string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storageService : StorageService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) 
          this.allCategoryWords = this.router.getCurrentNavigation()?.extras?.state?.categoryWords;
          this.category = this.router.getCurrentNavigation()?.extras?.state?.category;
      });
  }

  ngOnInit() {
    this.countLearntWords().then((res)=> {
      this.learntWordsCounter = res;
      if(this.learntWordsCounter == this.allCategoryWords.length)
        this.router.navigate(['congratulation']);
      else{ 
        this.initializeTestWordsArray().then(() => {
          this.changeArticles();
          this.loadNextWord();
        });
      }
    });
  }

  async countLearntWords() : Promise<number>{
    let data : Word;
    let counter = 0;
    for(let i = 0; i < this.allCategoryWords.length; i++)
    {
      data = await this.storageService.getObject(this.allCategoryWords[i].word + "_learnt");
      if (data != null)
        counter++;
    }
    return counter;
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
    console.log(this.i);
    this.choice = true;
    if(choice == 'M')
      this.isClick = true;
    else
      this.isClick1 = true;
    if(choice == this.testWords[this.i].gender){
      console.log("True");
      this.answer = "Correct!";
      this.isAnswerCorrect = true;
      this.correctAnswers++;
      this.testWords[this.i].learnIndex++;
      this.storageService.setObject(this.testWords[this.i].word, this.testWords[this.i]);
      if(this.testWords[this.i].learnIndex == this.learnIndexMax){
        console.log("Learnt!");
        this.storageService.setObject(this.testWords[this.i].word + "_learnt", this.testWords[this.i]);
      }
    }
    else{
      console.log("False");
      this.answer = "Wrong!";
      this.isAnswerCorrect = false;
    }
    this.allAnswers[this.i] = this.answer;
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

  changeArticles(){
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

    let size = this.allCategoryWords.length - this.learntWordsCounter;
    console.log(size);
    if(size < this.wordsInTest){
      console.log("Case 1");
      this.wordsInTest = size;
      for(let i = 0; i < this.allCategoryWords.length; i++)
      {
        data  = await this.storageService.getObject(this.allCategoryWords[i].word);
        if (data == null){
          console.log("A new word " + this.allCategoryWords[i].word);
          this.storageService.setObject(this.allCategoryWords[i].word, this.allCategoryWords[i]);
          this.testWords.push(this.allCategoryWords[i]);
        }
        else if(data.learnIndex < this.learnIndexMax){
          this.testWords.push(data);
          console.log("A word has already been in a test " + data.word);
        }
      }
    }
    else{
      console.log("Case 2");
      for(let i = 0; this.testWords.length < this.wordsInTest; i++)
      {
        data  = await this.storageService.getObject(this.allCategoryWords[i].word);
        if (data == null){
          console.log("A new word " + this.allCategoryWords[i].word);
          this.storageService.setObject(this.allCategoryWords[i].word, this.allCategoryWords[i]);
          this.testWords.push(this.allCategoryWords[i]);
        }
        else if(data.learnIndex < this.learnIndexMax){
          this.testWords.push(data);
          console.log("A word has already been in a test " + data.word);
        } 
      }
    }
  }

  loadNextWord(){
    if(this.testWords[this.i].gender == 'M'){
      this.correctArticle = this.articleM;
      this.description = "This word does not have a masculine ending. This is an exception.";
      this.findEnding(this.endingsMale);
    }
    else{
      this.correctArticle = this.articleF;
      this.description = "This word does not have a feminine ending. This is an exception.";
      this.findEnding(this.endingsFemale);
    }
    this.articlesWithWords[this.i] = this.correctArticle + " " + this.testWords[this.i].word;
  }

  findEnding(array : string[]){
    let wordAfterSplit : string[] = [];
    for(let i = 0; i < array.length; i++){
      if(this.testWords[this.i].word.endsWith(array[i]) == true){
        this.endingFound = true;
        console.log("Exists " + array[i]);
        wordAfterSplit = this.testWords[this.i].word.split(array[i], 1);
        this.word = wordAfterSplit[0];
        this.wordEnding = array[i];
        break;
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
    this.isAnswerCorrect = false;
    this.endingFound = false;
    this.changeArticles();
    this.loadNextWord();
    this.wordNumber++;
  }
}