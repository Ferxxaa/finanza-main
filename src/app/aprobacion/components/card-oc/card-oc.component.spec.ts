import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOcComponent } from './card-oc.component';

describe('CardOcComponent', () => {
  let component: CardOcComponent;
  let fixture: ComponentFixture<CardOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
