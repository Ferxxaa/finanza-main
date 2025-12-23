import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostoComponent } from './centro-costo.component';

describe('CentroCostoComponent', () => {
  let component: CentroCostoComponent;
  let fixture: ComponentFixture<CentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
