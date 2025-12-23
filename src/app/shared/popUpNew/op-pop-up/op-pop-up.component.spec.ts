import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpPopUpComponent } from './op-pop-up.component';

describe('OpPopUpComponent', () => {
  let component: OpPopUpComponent;
  let fixture: ComponentFixture<OpPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
