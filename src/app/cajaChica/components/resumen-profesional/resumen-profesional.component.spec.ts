import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProfesionalComponent } from './resumen-profesional.component';

describe('ResumenProfesionalComponent', () => {
  let component: ResumenProfesionalComponent;
  let fixture: ComponentFixture<ResumenProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
