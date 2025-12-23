import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOperacionalComponent } from './grafico-operacional.component';

describe('GraficoOperacionalComponent', () => {
  let component: GraficoOperacionalComponent;
  let fixture: ComponentFixture<GraficoOperacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoOperacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
