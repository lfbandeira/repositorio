import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTransferenciaComponent } from './form-transferencia.component';

describe('FormTransferenciaComponent', () => {
  let component: FormTransferenciaComponent;
  let fixture: ComponentFixture<FormTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
