import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoGastoComponent } from './lista-tipo-gasto.component';

describe('ListaTipoGastoComponent', () => {
  let component: ListaTipoGastoComponent;
  let fixture: ComponentFixture<ListaTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
