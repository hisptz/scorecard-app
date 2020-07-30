import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateHeaderComponent', () => {
  let component: CreateHeaderComponent;
  let fixture: ComponentFixture<CreateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CreateHeaderComponent],
    }).compileComponents();
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
