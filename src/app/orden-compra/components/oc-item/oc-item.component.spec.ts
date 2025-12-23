import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcItemComponent } from './oc-item.component';

describe('OcItemComponent', () => {
  let component: OcItemComponent;
  let fixture: ComponentFixture<OcItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
