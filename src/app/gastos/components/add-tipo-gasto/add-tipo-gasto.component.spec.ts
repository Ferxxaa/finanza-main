import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoGastoComponent } from './add-tipo-gasto.component';

describe('AddTipoGastoComponent', () => {
  let component: AddTipoGastoComponent;
  let fixture: ComponentFixture<AddTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
