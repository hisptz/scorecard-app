import { TestBed } from '@angular/core/testing';

import { CardsService } from './cards.service';
import { HttpClient } from '@angular/common/http';

describe('CardsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: null }],
    })
  );

  it('should be created', () => {
    const service: CardsService = TestBed.get(CardsService);
    expect(service).toBeTruthy();
  });
});
