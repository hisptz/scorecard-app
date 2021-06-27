import { TestBed } from '@angular/core/testing';

import { ScorecardMigrationService } from './scorecard-migration.service';

describe('ScorecardMigrationService', () => {
  let service: ScorecardMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScorecardMigrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
