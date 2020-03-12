import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationUnitDialogComponent } from './organisation-unit-dialog.component';

describe('OrganisationUnitDialogComponent', () => {
  let component: OrganisationUnitDialogComponent;
  let fixture: ComponentFixture<OrganisationUnitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationUnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
