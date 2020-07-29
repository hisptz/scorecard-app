import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorsComponent } from './selectors.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('SelectorsComponent', () => {
  let component: SelectorsComponent;
  let fixture: ComponentFixture<SelectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorsComponent ],
      imports: [ MatDialogModule ]
    })
    .compileComponents();
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
