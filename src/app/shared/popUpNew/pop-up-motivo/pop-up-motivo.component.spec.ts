import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMotivoComponent } from './pop-up-motivo.component';

describe('PopUpMotivoComponent', () => {
  let component: PopUpMotivoComponent;
  let fixture: ComponentFixture<PopUpMotivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpMotivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
