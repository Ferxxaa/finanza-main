import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresEstrategicosCostoComponent } from './proveedores-estrategicos-costo.component';

describe('ProveedoresEstrategicosCostoComponent', () => {
  let component: ProveedoresEstrategicosCostoComponent;
  let fixture: ComponentFixture<ProveedoresEstrategicosCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresEstrategicosCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresEstrategicosCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
