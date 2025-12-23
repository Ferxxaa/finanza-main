import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisOrdenesCompraComponent } from './mis-ordenes-compra.component';

describe('MisOrdenesCompraComponent', () => {
  let component: MisOrdenesCompraComponent;
  let fixture: ComponentFixture<MisOrdenesCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisOrdenesCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisOrdenesCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
