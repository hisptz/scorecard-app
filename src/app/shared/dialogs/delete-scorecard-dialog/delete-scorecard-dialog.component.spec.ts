import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScorecardDialogComponent } from './delete-scorecard-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteScorecardDialogComponent', () => {
  let component: DeleteScorecardDialogComponent;
  let fixture: ComponentFixture<DeleteScorecardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteScorecardDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteScorecardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
