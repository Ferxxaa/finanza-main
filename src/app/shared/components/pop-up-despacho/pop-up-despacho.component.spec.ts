import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDespachoComponent } from './pop-up-despacho.component';

describe('PopUpDespachoComponent', () => {
  let component: PopUpDespachoComponent;
  let fixture: ComponentFixture<PopUpDespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
