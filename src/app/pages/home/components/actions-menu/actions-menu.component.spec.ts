import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMenuComponent } from './actions-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

describe('ActionsMenuComponent', () => {
  let component: ActionsMenuComponent;
  let fixture: ComponentFixture<ActionsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ActionsMenuComponent],
      providers: [{ provide: MatDialog, useValue: null }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
