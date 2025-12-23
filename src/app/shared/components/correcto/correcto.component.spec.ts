import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectoComponent } from './correcto.component';

describe('CorrectoComponent', () => {
  let component: CorrectoComponent;
  let fixture: ComponentFixture<CorrectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
