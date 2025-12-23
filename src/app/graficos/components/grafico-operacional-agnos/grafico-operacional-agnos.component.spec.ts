import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoOperacionalAgnosComponent } from './grafico-operacional-agnos.component';

describe('GraficoOperacionalAgnosComponent', () => {
  let component: GraficoOperacionalAgnosComponent;
  let fixture: ComponentFixture<GraficoOperacionalAgnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoOperacionalAgnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoOperacionalAgnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
