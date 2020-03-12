import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailItemComponent } from './thumbnail-item.component';

describe('ThumbnailItemComponent', () => {
  let component: ThumbnailItemComponent;
  let fixture: ComponentFixture<ThumbnailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
