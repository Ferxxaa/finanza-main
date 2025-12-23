import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaNegocioComponent } from './add-area-negocio.component';

describe('AddAreaNegocioComponent', () => {
  let component: AddAreaNegocioComponent;
  let fixture: ComponentFixture<AddAreaNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAreaNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
