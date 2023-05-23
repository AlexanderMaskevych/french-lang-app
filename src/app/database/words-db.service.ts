import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { Word } from './Word';

@Injectable({
  providedIn: 'root'
})
export class WordsDbService {
  wordsRefs: AngularFireList<any>;

  constructor(private db: AngularFireDatabase){}

  getWords(category : string) {
    return this.wordsRefs = this.db.list(category);
  }
}
