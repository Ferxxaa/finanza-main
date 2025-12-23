import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdenCompraComponent } from './view-orden-compra.component';

describe('ViewOrdenCompraComponent', () => {
  let component: ViewOrdenCompraComponent;
  let fixture: ComponentFixture<ViewOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
