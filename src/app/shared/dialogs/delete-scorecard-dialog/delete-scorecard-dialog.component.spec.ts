import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScorecardDialogComponent } from './delete-scorecard-dialog.component';

describe('DeleteScorecardDialogComponent', () => {
  let component: DeleteScorecardDialogComponent;
  let fixture: ComponentFixture<DeleteScorecardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteScorecardDialogComponent ]
    })
    .compileComponents();
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
