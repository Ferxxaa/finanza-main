import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCuentaCorrienteComponent } from './get-cuenta-corriente.component';

describe('GetCuentaCorrienteComponent', () => {
  let component: GetCuentaCorrienteComponent;
  let fixture: ComponentFixture<GetCuentaCorrienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCuentaCorrienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
