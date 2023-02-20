import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AccountListRes,
  BudgetAssignmentListRes,
  BudgetCategoryListRes,
  BudgetOverviewRes,
} from 'src/backend';
import {
  Account,
  BudgetAssignmentList,
  BudgetCategory,
  BudgetOverviewItem,
} from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ChingBackendService {
  constructor(private http: HttpClient) {}

  getOverview(year: number, month: number): Observable<BudgetOverviewItem[]> {
    const url = `/api/overview/budget/${year}/${month}`;
    return this.http.get<BudgetOverviewRes>(url);
  }

  getBudgetAssignments(
    offset: number,
    limit: number,
    budgetCategoryId?: number
  ): Observable<BudgetAssignmentList> {
    const url = '/api/budget-assignment';

    const params: any = {
      limit,
      offset,
    };

    if (budgetCategoryId !== undefined) {
      params['budgetCategoryId'] = budgetCategoryId;
    }
    return this.http.get<BudgetAssignmentListRes>(url, { params });
  }

  getAccounts(): Observable<Account[]> {
    const url = '/api/account';
    return this.http.get<AccountListRes>(url);
  }

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return this.http.get<BudgetCategoryListRes>('/api/budget-category');
  }
}
