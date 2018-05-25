import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEquiposComponent } from './tabla-equipos.component';

describe('TablaEquiposComponent', () => {
  let component: TablaEquiposComponent;
  let fixture: ComponentFixture<TablaEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
