import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardMigrationSummaryDialogComponent } from './scorecard-migration-summary-dialog.component';

describe('ScorecardMigrationSummaryDialogComponent', () => {
  let component: ScorecardMigrationSummaryDialogComponent;
  let fixture: ComponentFixture<ScorecardMigrationSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardMigrationSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardMigrationSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
