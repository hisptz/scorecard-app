import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorsComponent } from './selectors.component';
import { MatDialog } from '@angular/material/dialog';

describe('SelectorsComponent', () => {
  let component: SelectorsComponent;
  let fixture: ComponentFixture<SelectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorsComponent],
      providers: [{ provide: MatDialog, useValue: null }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
