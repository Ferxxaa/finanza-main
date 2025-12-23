import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcPopUpComponent } from './oc-pop-up.component';

describe('OcPopUpComponent', () => {
  let component: OcPopUpComponent;
  let fixture: ComponentFixture<OcPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
