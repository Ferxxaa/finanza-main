import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTemplateComponent } from './pop-up-template.component';

describe('PopUpTemplateComponent', () => {
  let component: PopUpTemplateComponent;
  let fixture: ComponentFixture<PopUpTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
