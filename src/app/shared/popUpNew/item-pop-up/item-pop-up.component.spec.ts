import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPopUpComponent } from './item-pop-up.component';

describe('ItemPopUpComponent', () => {
  let component: ItemPopUpComponent;
  let fixture: ComponentFixture<ItemPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
