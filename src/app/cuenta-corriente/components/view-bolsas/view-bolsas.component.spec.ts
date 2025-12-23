import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBolsasComponent } from './view-bolsas.component';

describe('ViewBolsasComponent', () => {
  let component: ViewBolsasComponent;
  let fixture: ComponentFixture<ViewBolsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBolsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBolsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
