import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ScorecardDataMigrationEffects } from './scorecard-data-migration.effects';

describe('ScorecardDataMigrationEffects', () => {
  let actions$: Observable<any>;
  let effects: ScorecardDataMigrationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScorecardDataMigrationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ScorecardDataMigrationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
