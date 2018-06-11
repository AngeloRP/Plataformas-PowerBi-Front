import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantiendaSelectComponent } from './finantienda-select.component';

describe('FinantiendaSelectComponent', () => {
  let component: FinantiendaSelectComponent;
  let fixture: ComponentFixture<FinantiendaSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinantiendaSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantiendaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
