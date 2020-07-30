import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardThumbnailViewComponent } from './card-thumbnail-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('Card Thumbnail ViewComponent', () => {
  let component: CardThumbnailViewComponent;
  let fixture: ComponentFixture<CardThumbnailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NgxPaginationModule, Ng2SearchPipeModule],
      declarations: [CardThumbnailViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardThumbnailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
