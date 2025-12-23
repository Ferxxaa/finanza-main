import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfesionalComponent } from './add-profesional.component';

describe('AddProfesionalComponent', () => {
  let component: AddProfesionalComponent;
  let fixture: ComponentFixture<AddProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
