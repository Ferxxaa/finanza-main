import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorPopUpComponent } from './proveedor-pop-up.component';

describe('ProveedorPopUpComponent', () => {
  let component: ProveedorPopUpComponent;
  let fixture: ComponentFixture<ProveedorPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
