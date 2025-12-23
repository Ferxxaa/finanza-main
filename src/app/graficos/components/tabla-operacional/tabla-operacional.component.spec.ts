import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaOperacionalComponent } from './tabla-operacional.component';

describe('TablaOperacionalComponent', () => {
  let component: TablaOperacionalComponent;
  let fixture: ComponentFixture<TablaOperacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaOperacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
