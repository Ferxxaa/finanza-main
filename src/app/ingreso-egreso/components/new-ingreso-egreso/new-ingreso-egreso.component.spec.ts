import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngresoEgresoComponent } from './new-ingreso-egreso.component';

describe('NewIngresoEgresoComponent', () => {
  let component: NewIngresoEgresoComponent;
  let fixture: ComponentFixture<NewIngresoEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIngresoEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIngresoEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
