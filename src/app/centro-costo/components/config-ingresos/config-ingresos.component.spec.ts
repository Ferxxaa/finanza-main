import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIngresosComponent } from './config-ingresos.component';

describe('ConfigIngresosComponent', () => {
  let component: ConfigIngresosComponent;
  let fixture: ComponentFixture<ConfigIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
