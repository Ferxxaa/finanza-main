import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTipoGastoComponent } from './pop-up-tipo-gasto.component';

describe('PopUpTipoGastoComponent', () => {
  let component: PopUpTipoGastoComponent;
  let fixture: ComponentFixture<PopUpTipoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpTipoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpTipoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
