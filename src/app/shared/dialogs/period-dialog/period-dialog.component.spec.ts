import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodDialogComponent } from './period-dialog.component';

describe('PeriodDialogComponent', () => {
  let component: PeriodDialogComponent;
  let fixture: ComponentFixture<PeriodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
