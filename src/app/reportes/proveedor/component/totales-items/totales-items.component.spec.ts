import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesItemsComponent } from './totales-items.component';

describe('TotalesItemsComponent', () => {
  let component: TotalesItemsComponent;
  let fixture: ComponentFixture<TotalesItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalesItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
