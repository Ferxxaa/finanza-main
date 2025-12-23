import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTipoGastoComponent } from './add-sub-tipo-gasto.component';

describe('AddSubTipoGastoComponent', () => {
  let component: AddSubTipoGastoComponent;
  let fixture: ComponentFixture<AddSubTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
