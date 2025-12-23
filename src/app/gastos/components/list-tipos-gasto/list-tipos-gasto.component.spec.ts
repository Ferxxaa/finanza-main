import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiposGastoComponent } from './list-tipos-gasto.component';

describe('ListTiposGastoComponent', () => {
  let component: ListTiposGastoComponent;
  let fixture: ComponentFixture<ListTiposGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTiposGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTiposGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
