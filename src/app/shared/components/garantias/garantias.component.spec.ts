import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiasComponent } from './garantias.component';

describe('GarantiasComponent', () => {
  let component: GarantiasComponent;
  let fixture: ComponentFixture<GarantiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarantiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
