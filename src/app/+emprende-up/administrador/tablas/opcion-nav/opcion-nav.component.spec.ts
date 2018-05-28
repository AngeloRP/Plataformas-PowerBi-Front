import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionNavComponent } from './opcion-nav.component';

describe('OpcionNavComponent', () => {
  let component: OpcionNavComponent;
  let fixture: ComponentFixture<OpcionNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
