import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralFormComponent } from './central-form.component';

describe('CentralFormComponent', () => {
  let component: CentralFormComponent;
  let fixture: ComponentFixture<CentralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
