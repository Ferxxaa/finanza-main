import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreAnualComponent } from './cierre-anual.component';

describe('CierreAnualComponent', () => {
  let component: CierreAnualComponent;
  let fixture: ComponentFixture<CierreAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
