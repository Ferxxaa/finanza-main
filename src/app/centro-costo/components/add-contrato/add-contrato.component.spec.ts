import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContratoComponent } from './add-contrato.component';

describe('AddContratoComponent', () => {
  let component: AddContratoComponent;
  let fixture: ComponentFixture<AddContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
