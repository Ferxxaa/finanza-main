import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetViewCentroCostoComponent } from './get-view-centro-costo.component';

describe('GetViewCentroCostoComponent', () => {
  let component: GetViewCentroCostoComponent;
  let fixture: ComponentFixture<GetViewCentroCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetViewCentroCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetViewCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
