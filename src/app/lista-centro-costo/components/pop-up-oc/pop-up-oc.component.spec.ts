import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpOcComponent } from './pop-up-oc.component';

describe('PopUpOcComponent', () => {
  let component: PopUpOcComponent;
  let fixture: ComponentFixture<PopUpOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
