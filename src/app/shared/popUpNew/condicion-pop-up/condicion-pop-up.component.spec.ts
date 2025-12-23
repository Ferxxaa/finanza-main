import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionPopUpComponent } from './condicion-pop-up.component';

describe('CondicionPopUpComponent', () => {
  let component: CondicionPopUpComponent;
  let fixture: ComponentFixture<CondicionPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
