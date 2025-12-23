import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCentrosCostoComponent } from './lista-centros-costo.component';

describe('ListaCentrosCostoComponent', () => {
  let component: ListaCentrosCostoComponent;
  let fixture: ComponentFixture<ListaCentrosCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCentrosCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCentrosCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
