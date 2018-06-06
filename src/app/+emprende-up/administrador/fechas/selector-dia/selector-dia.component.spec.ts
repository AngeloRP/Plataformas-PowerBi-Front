import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDiaComponent } from './selector-dia.component';

describe('SelectorDiaComponent', () => {
  let component: SelectorDiaComponent;
  let fixture: ComponentFixture<SelectorDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
