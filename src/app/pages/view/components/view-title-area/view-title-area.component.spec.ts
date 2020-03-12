import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTitleAreaComponent } from './view-title-area.component';

describe('ViewTitleAreaComponent', () => {
  let component: ViewTitleAreaComponent;
  let fixture: ComponentFixture<ViewTitleAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTitleAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTitleAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
