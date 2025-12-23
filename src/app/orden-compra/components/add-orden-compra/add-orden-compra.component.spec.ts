import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenCompraComponent } from './add-orden-compra.component';

describe('AddOrdenCompraComponent', () => {
  let component: AddOrdenCompraComponent;
  let fixture: ComponentFixture<AddOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
