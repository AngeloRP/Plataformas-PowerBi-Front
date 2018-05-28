import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesNavComponent } from './opciones-nav.component';

describe('OpcionesNavComponent', () => {
  let component: OpcionesNavComponent;
  let fixture: ComponentFixture<OpcionesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
