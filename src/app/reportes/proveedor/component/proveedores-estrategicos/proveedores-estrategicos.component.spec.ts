import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresEstrategicosComponent } from './proveedores-estrategicos.component';

describe('ProveedoresEstrategicosComponent', () => {
  let component: ProveedoresEstrategicosComponent;
  let fixture: ComponentFixture<ProveedoresEstrategicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresEstrategicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresEstrategicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
