import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaJefesComponent } from './tabla-jefes.component';

describe('TablaJefesComponent', () => {
  let component: TablaJefesComponent;
  let fixture: ComponentFixture<TablaJefesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaJefesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaJefesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
