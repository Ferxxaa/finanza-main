import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOcComponent } from './popup-oc.component';

describe('PopupOcComponent', () => {
  let component: PopupOcComponent;
  let fixture: ComponentFixture<PopupOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
