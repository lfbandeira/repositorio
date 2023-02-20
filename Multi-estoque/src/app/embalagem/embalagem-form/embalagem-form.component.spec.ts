import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalagemFormComponent } from './embalagem-form.component';

describe('EmbalagemFormComponent', () => {
  let component: EmbalagemFormComponent;
  let fixture: ComponentFixture<EmbalagemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbalagemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbalagemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
