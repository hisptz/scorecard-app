import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMenuComponent } from './info-menu.component';
import { TourService } from 'ngx-tour-core';
import { MatMenuModule } from '@angular/material/menu';

describe('InfoMenuComponent', () => {
  let component: InfoMenuComponent;
  let fixture: ComponentFixture<InfoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [InfoMenuComponent],
      providers: [{ provide: TourService, useValue: null }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
