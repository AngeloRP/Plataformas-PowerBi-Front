import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieGraficoPrincipalComponent } from './pie-grafico-principal.component';

describe('PieGraficoPrincipalComponent', () => {
  let component: PieGraficoPrincipalComponent;
  let fixture: ComponentFixture<PieGraficoPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieGraficoPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieGraficoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
