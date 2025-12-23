import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCierresComponent } from './graph-cierres.component';

describe('GraphCierresComponent', () => {
  let component: GraphCierresComponent;
  let fixture: ComponentFixture<GraphCierresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphCierresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCierresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
