import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProveedorComponent } from './pop-up-proveedor.component';

describe('PopUpProveedorComponent', () => {
  let component: PopUpProveedorComponent;
  let fixture: ComponentFixture<PopUpProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
