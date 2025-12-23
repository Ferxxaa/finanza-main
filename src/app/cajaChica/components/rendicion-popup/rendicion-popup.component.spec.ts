import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendicionPopupComponent } from './rendicion-popup.component';

describe('RendicionPopupComponent', () => {
  let component: RendicionPopupComponent;
  let fixture: ComponentFixture<RendicionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendicionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendicionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
