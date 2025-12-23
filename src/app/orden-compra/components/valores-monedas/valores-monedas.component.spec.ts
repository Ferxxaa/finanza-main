import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresMonedasComponent } from './valores-monedas.component';

describe('ValoresMonedasComponent', () => {
  let component: ValoresMonedasComponent;
  let fixture: ComponentFixture<ValoresMonedasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresMonedasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
