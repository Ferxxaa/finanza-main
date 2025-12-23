import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAnualComponent } from './resumen-anual.component';

describe('ResumenAnualComponent', () => {
  let component: ResumenAnualComponent;
  let fixture: ComponentFixture<ResumenAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
