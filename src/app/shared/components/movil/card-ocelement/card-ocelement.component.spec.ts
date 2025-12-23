import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOcelementComponent } from './card-ocelement.component';

describe('CardOcelementComponent', () => {
  let component: CardOcelementComponent;
  let fixture: ComponentFixture<CardOcelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOcelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOcelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
