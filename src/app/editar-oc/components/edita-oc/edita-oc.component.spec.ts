import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaOcComponent } from './edita-oc.component';

describe('EditaOcComponent', () => {
  let component: EditaOcComponent;
  let fixture: ComponentFixture<EditaOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
