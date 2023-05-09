import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Word } from './Word';

@Injectable({
  providedIn: 'root'
})
export class WordsDbService {
  wordsRef: AngularFireList<any>;


  constructor(private db: AngularFireDatabase){}

  getWords(category : string) {
    return this.wordsRef = this.db.list(category);
    //this.wordsRef.valueChanges().subscribe(res =>{console.log(res)})
   }
}
