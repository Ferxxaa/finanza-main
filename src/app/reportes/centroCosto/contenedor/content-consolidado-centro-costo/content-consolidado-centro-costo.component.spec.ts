import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsolidadoCentroCostoComponent } from './content-consolidado-centro-costo.component';

describe('ContentConsolidadoCentroCostoComponent', () => {
  let component: ContentConsolidadoCentroCostoComponent;
  let fixture: ComponentFixture<ContentConsolidadoCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentConsolidadoCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsolidadoCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
