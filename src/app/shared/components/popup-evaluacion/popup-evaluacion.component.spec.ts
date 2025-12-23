import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEvaluacionComponent } from './popup-evaluacion.component';

describe('PopupEvaluacionComponent', () => {
  let component: PopupEvaluacionComponent;
  let fixture: ComponentFixture<PopupEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
