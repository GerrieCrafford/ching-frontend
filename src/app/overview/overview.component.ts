import { Component } from '@angular/core';
import { BudgetOverviewItem } from 'src/types';
import { ChingBackendService } from '../ching-backend.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  budgetOverview: BudgetOverviewItem[] = [];

  constructor(private backend: ChingBackendService) {}

  ngOnInit(): void {
    this.getOverview();
  }

  getOverview(): void {
    this.backend
      .getOverview(2023, 2)
      .subscribe((items) => (this.budgetOverview = items));
  }
}
