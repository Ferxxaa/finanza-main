import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoresEvaluacionComponent } from './colores-evaluacion.component';

describe('ColoresEvaluacionComponent', () => {
  let component: ColoresEvaluacionComponent;
  let fixture: ComponentFixture<ColoresEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoresEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoresEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
