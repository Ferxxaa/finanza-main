import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCuentaCorrienteComponent } from './item-cuenta-corriente.component';

describe('ItemCuentaCorrienteComponent', () => {
  let component: ItemCuentaCorrienteComponent;
  let fixture: ComponentFixture<ItemCuentaCorrienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCuentaCorrienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
