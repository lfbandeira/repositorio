import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalagemListComponent } from './embalagem-list.component';

describe('EmbalagemListComponent', () => {
  let component: EmbalagemListComponent;
  let fixture: ComponentFixture<EmbalagemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbalagemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbalagemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
