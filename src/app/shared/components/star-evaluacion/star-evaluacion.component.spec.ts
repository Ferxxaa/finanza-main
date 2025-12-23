import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarEvaluacionComponent } from './star-evaluacion.component';

describe('StarEvaluacionComponent', () => {
  let component: StarEvaluacionComponent;
  let fixture: ComponentFixture<StarEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
