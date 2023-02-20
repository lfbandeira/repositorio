import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAvariaComponent } from './form-avaria.component';

describe('FormAvariaComponent', () => {
  let component: FormAvariaComponent;
  let fixture: ComponentFixture<FormAvariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAvariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAvariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
