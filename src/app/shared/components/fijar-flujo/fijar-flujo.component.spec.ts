import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FijarFlujoComponent } from './fijar-flujo.component';

describe('FijarFlujoComponent', () => {
  let component: FijarFlujoComponent;
  let fixture: ComponentFixture<FijarFlujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FijarFlujoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FijarFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
