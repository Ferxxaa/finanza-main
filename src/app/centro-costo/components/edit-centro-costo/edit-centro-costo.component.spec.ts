import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCentroCostoComponent } from './edit-centro-costo.component';

describe('EditCentroCostoComponent', () => {
  let component: EditCentroCostoComponent;
  let fixture: ComponentFixture<EditCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
