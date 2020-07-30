import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderComponent } from './home-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TourModule } from 'ngx-tour-core';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeHeaderComponent', () => {
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TourMatMenuModule.forRoot(), RouterTestingModule],
      declarations: [HomeHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
