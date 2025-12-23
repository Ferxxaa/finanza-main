import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBolsasComponent } from './config-bolsas.component';

describe('ConfigBolsasComponent', () => {
  let component: ConfigBolsasComponent;
  let fixture: ComponentFixture<ConfigBolsasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBolsasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBolsasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
