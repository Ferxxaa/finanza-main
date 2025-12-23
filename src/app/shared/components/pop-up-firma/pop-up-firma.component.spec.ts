import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFirmaComponent } from './pop-up-firma.component';

describe('PopUpFirmaComponent', () => {
  let component: PopUpFirmaComponent;
  let fixture: ComponentFixture<PopUpFirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpFirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
