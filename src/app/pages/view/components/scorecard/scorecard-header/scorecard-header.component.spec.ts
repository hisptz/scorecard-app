import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardHeaderComponent } from './scorecard-header.component';

describe('ScorecardHeaderComponent', () => {
  let component: ScorecardHeaderComponent;
  let fixture: ComponentFixture<ScorecardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
