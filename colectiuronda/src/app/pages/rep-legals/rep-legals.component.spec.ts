import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepLegalsComponent } from './rep-legals.component';

describe('RepLegalsComponent', () => {
  let component: RepLegalsComponent;
  let fixture: ComponentFixture<RepLegalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepLegalsComponent]
    });
    fixture = TestBed.createComponent(RepLegalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
