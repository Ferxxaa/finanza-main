import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVentasAreaNegocioComponent } from './item-ventas-area-negocio.component';

describe('ItemVentasAreaNegocioComponent', () => {
  let component: ItemVentasAreaNegocioComponent;
  let fixture: ComponentFixture<ItemVentasAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemVentasAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVentasAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
