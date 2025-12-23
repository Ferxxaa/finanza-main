import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentroCostoComponent } from './list-centro-costo.component';

describe('ListCentroCostoComponent', () => {
  let component: ListCentroCostoComponent;
  let fixture: ComponentFixture<ListCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
