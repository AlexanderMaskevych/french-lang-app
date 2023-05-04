import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Word } from './Word';

@Injectable({
  providedIn: 'root'
})
export class WordsDbService {
  wordsRef: AngularFireList<any>;


  constructor(private db: AngularFireDatabase){}

  getWords() {
    return this.wordsRef = this.db.list('/Food');
   }
}
