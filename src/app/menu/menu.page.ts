import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../database/auth.service';

import { Word } from '../database/Word';
import { WordsDbService } from '../database/words-db.service';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {

  //isLoggedIn = false;

  categories : string [] = ['Animals', 'Body', 'Food'];
  allCategoriesWords : Word[][] = [];
  categoryWords : Word[] = [];

  constructor(public authService: AuthService, private router: Router, private wrdService: WordsDbService, private storageService : StorageService) {}

  ngOnInit() {
    for(let i = 0; i < this.categories.length; i++){
      this.allCategoriesWords.push([]);
      this.fetchWords(this.categories[i]);
      let wordRes = this.wrdService.getWords(this.categories[i]);
      wordRes.snapshotChanges().subscribe(res => {
        res.forEach(item => {
          let w = item.payload.toJSON();
          w!['$key'] = item.key;
          this.allCategoriesWords[i].push(w as Word);
        });
      });
    }
  }

  fetchWords(category : string) {
    this.wrdService.getWords(category).valueChanges().subscribe(res =>{console.log(res)})
  }

  toTest(category : string){
    console.log(this.allCategoriesWords)
    if(category === "Animals")
      this.categoryWords = this.allCategoriesWords[0];
    else if(category === "Body")
      this.categoryWords = this.allCategoriesWords[1];
    else
      this.categoryWords = this.allCategoriesWords[2];

    let navigationExtras: NavigationExtras = {
      state: {
        categoryWords : this.categoryWords,
        category : category
      }
    };
    this.router.navigate(['test'], navigationExtras);
  }

  Show1() {
    this.router.navigate(['login-menu']);
  }
  
  Show2() {
    this.router.navigate(['registration']);
  }

  Show3() {
    this.authService.logout();
  }

  handleRefresh(event) {
    setTimeout(() => {
      if(this.authService.isLoggedIn == true)
        this.ngOnInit();
      else
        alert("Dictionary update is available only to authorized users");
      event.target.complete();
    }, 2000);
  }
}

