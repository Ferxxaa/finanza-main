import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoInicialComponent } from './monto-inicial.component';

describe('MontoInicialComponent', () => {
  let component: MontoInicialComponent;
  let fixture: ComponentFixture<MontoInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
