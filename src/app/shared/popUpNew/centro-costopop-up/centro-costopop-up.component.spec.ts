import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCostopopUpComponent } from './centro-costopop-up.component';

describe('CentroCostopopUpComponent', () => {
  let component: CentroCostopopUpComponent;
  let fixture: ComponentFixture<CentroCostopopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCostopopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCostopopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
