import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCierreComponent } from './listado-cierre.component';

describe('ListadoCierreComponent', () => {
  let component: ListadoCierreComponent;
  let fixture: ComponentFixture<ListadoCierreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoCierreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
