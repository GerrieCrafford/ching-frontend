import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetOverview } from 'src/backend';
import { BudgetOverviewItem } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class ChingBackendService {
  constructor(private http: HttpClient) {}

  getOverview(year: number, month: number): Observable<BudgetOverviewItem[]> {
    const url = `/api/overview/budget/${year}/${month}`;
    return this.http.get<BudgetOverview>(url);
  }
}
