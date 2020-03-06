import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetupComponent } from './view-setup.component';

describe('ViewSetupComponent', () => {
  let component: ViewSetupComponent;
  let fixture: ComponentFixture<ViewSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
