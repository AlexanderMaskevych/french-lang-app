import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class WordsDbService {
  wordsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase){}

  getWords(){
    this.wordsRef = this.db.list<any>('Food');
    return this.wordsRef;
   }
}
