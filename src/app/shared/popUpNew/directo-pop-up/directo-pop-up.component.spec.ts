import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoPopUpComponent } from './directo-pop-up.component';

describe('DirectoPopUpComponent', () => {
  let component: DirectoPopUpComponent;
  let fixture: ComponentFixture<DirectoPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
