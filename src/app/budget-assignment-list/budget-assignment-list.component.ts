import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { BudgetAssignmentItem } from 'src/types';
import { ChingBackendService } from '../ching-backend.service';

@Component({
  selector: 'app-budget-assignment-list',
  templateUrl: './budget-assignment-list.component.html',
  styleUrls: ['./budget-assignment-list.component.scss'],
})
export class BudgetAssignmentListComponent {
  loading: boolean = false;
  totalRecords!: number;
  budgetAssignments: BudgetAssignmentItem[] = [];

  constructor(
    private backend: ChingBackendService,
    private route: ActivatedRoute
  ) {}

  loadBudgetAssignments(event: LazyLoadEvent) {
    const budgetCategoryIdStr =
      this.route.snapshot.queryParamMap.get('budgetCategoryId');
    const budgetCategoryId = budgetCategoryIdStr
      ? Number(budgetCategoryIdStr)
      : undefined;

    this.loading = true;
    console.log({ event, budgetCategoryId, budgetCategoryIdStr });
    this.backend
      .getBudgetAssignments(
        event.first || 0,
        event.rows || 10,
        budgetCategoryId
      )
      .subscribe((list) => {
        this.budgetAssignments = list.items;
        this.totalRecords = list.totalItems;
        this.loading = false;
      });
  }
}
