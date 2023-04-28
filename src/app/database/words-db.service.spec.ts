import { TestBed } from '@angular/core/testing';

import { WordsDbService } from './words-db.service';

describe('WordsDbService', () => {
  let service: WordsDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordsDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
