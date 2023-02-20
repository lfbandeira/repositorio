import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralListComponent } from './central-list.component';

describe('CentralListComponent', () => {
  let component: CentralListComponent;
  let fixture: ComponentFixture<CentralListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
