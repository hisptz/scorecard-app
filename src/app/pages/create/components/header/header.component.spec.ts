import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: CreateHeaderComponent;
  let fixture: ComponentFixture<CreateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
