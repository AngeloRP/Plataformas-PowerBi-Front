import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInfoGraficoComponent } from './extra-info-grafico.component';

describe('ExtraInfoGraficoComponent', () => {
  let component: ExtraInfoGraficoComponent;
  let fixture: ComponentFixture<ExtraInfoGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraInfoGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInfoGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
