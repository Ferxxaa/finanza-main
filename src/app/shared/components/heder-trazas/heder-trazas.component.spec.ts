import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HederTrazasComponent } from './heder-trazas.component';

describe('HederTrazasComponent', () => {
  let component: HederTrazasComponent;
  let fixture: ComponentFixture<HederTrazasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HederTrazasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HederTrazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
