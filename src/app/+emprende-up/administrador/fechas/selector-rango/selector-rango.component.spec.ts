import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorRangoComponent } from './selector-rango.component';

describe('SelectorRangoComponent', () => {
  let component: SelectorRangoComponent;
  let fixture: ComponentFixture<SelectorRangoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorRangoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorRangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
