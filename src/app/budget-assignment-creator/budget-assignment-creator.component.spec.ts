import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAssignmentCreatorComponent } from './budget-assignment-creator.component';

describe('BudgetAssignmentCreatorComponent', () => {
  let component: BudgetAssignmentCreatorComponent;
  let fixture: ComponentFixture<BudgetAssignmentCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAssignmentCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAssignmentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
