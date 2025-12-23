import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGastoPopUpComponent } from './tipo-gasto-pop-up.component';

describe('TipoGastoPopUpComponent', () => {
  let component: TipoGastoPopUpComponent;
  let fixture: ComponentFixture<TipoGastoPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoGastoPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoGastoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
