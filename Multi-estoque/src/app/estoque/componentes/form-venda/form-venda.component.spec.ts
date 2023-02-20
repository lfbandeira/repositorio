import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVendaComponent } from './form-venda.component';

describe('FormVendaComponent', () => {
  let component: FormVendaComponent;
  let fixture: ComponentFixture<FormVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
