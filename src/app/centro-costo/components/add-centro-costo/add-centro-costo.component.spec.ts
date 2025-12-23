import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentroCostoComponent } from './add-centro-costo.component';

describe('AddCentroCostoComponent', () => {
  let component: AddCentroCostoComponent;
  let fixture: ComponentFixture<AddCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
