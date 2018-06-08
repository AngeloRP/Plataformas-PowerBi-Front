import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFechasComponent } from './filtro-fechas.component';

describe('FiltroFechasComponent', () => {
  let component: FiltroFechasComponent;
  let fixture: ComponentFixture<FiltroFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
