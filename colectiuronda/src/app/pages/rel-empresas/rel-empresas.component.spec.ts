import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEmpresasComponent } from './rel-empresas.component';

describe('RelEmpresasComponent', () => {
  let component: RelEmpresasComponent;
  let fixture: ComponentFixture<RelEmpresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelEmpresasComponent]
    });
    fixture = TestBed.createComponent(RelEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
