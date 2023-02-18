import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAssignmentListComponent } from './budget-assignment-list.component';

describe('BudgetAssignmentListComponent', () => {
  let component: BudgetAssignmentListComponent;
  let fixture: ComponentFixture<BudgetAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAssignmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
