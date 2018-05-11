import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGraficoComponent } from './pie-grafico.component';

describe('PieGraficoComponent', () => {
  let component: PieGraficoComponent;
  let fixture: ComponentFixture<PieGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
