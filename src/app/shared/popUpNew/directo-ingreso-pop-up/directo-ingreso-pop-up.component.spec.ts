import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoIngresoPopUpComponent } from './directo-ingreso-pop-up.component';

describe('DirectoIngresoPopUpComponent', () => {
  let component: DirectoIngresoPopUpComponent;
  let fixture: ComponentFixture<DirectoIngresoPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoIngresoPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoIngresoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
