import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendDefintionListComponent } from './legend-defintion-list.component';

describe('LegendDefintionListComponent', () => {
  let component: LegendDefintionListComponent;
  let fixture: ComponentFixture<LegendDefintionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendDefintionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendDefintionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
