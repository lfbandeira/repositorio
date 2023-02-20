import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAporteComponent } from './form-aporte.component';

describe('FormAporteComponent', () => {
  let component: FormAporteComponent;
  let fixture: ComponentFixture<FormAporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
