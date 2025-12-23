import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMovimientosComponent } from './get-movimientos.component';

describe('GetMovimientosComponent', () => {
  let component: GetMovimientosComponent;
  let fixture: ComponentFixture<GetMovimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMovimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
