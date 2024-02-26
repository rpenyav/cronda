import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProEcoComponent } from './pro-eco.component';

describe('ProEcoComponent', () => {
  let component: ProEcoComponent;
  let fixture: ComponentFixture<ProEcoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProEcoComponent]
    });
    fixture = TestBed.createComponent(ProEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
