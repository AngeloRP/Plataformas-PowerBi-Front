import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGraficosComponent } from './pie-graficos.component';

describe('PieGraficosComponent', () => {
  let component: PieGraficosComponent;
  let fixture: ComponentFixture<PieGraficosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGraficosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
