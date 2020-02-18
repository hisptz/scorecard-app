import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendColorPickerComponent } from './legend-color-picker.component';

describe('LegendColorPickerComponent', () => {
  let component: LegendColorPickerComponent;
  let fixture: ComponentFixture<LegendColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
