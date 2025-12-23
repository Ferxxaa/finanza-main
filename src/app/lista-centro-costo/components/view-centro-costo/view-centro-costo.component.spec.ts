import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCentroCostoComponent } from './view-centro-costo.component';

describe('ViewCentroCostoComponent', () => {
  let component: ViewCentroCostoComponent;
  let fixture: ComponentFixture<ViewCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
