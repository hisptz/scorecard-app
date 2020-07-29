import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardThumbnailViewComponent } from './card-thumbnail-view.component';

describe('CardViewComponent', () => {
  let component: CardThumbnailViewComponent;
  let fixture: ComponentFixture<CardThumbnailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardThumbnailViewComponent ]
    })
    .compileComponents();
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
