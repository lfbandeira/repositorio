import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelEstoqueComponent } from './rel-estoque.component';

describe('RelEstoqueComponent', () => {
  let component: RelEstoqueComponent;
  let fixture: ComponentFixture<RelEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
