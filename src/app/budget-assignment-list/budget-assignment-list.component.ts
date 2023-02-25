import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
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
  budgetCategoryId?: number;

  @ViewChild(Table)
  private table!: Table;

  constructor(
    private backend: ChingBackendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const budgetCategoryIdStr = params.get('budgetCategoryId');
      this.budgetCategoryId = budgetCategoryIdStr
        ? Number(budgetCategoryIdStr)
        : undefined;

      this.table.reset();
    });
  }

  loadBudgetAssignments(event: LazyLoadEvent) {
    this.loading = true;
    console.log({ event, budgetCategoryId: this.budgetCategoryId });
    this.backend
      .getBudgetAssignments(
        event.first || 0,
        event.rows || 10,
        this.budgetCategoryId
      )
      .subscribe((list) => {
        this.budgetAssignments = list.items;
        this.totalRecords = list.totalItems;
        this.loading = false;
      });
  }
}
