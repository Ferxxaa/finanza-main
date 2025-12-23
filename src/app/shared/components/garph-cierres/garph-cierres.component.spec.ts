import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarphCierresComponent } from './garph-cierres.component';

describe('GarphCierresComponent', () => {
  let component: GarphCierresComponent;
  let fixture: ComponentFixture<GarphCierresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarphCierresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarphCierresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
