import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { AppRoutingModule } from './app-routing.module';

import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { CurrencyZarPipe } from './currency-zar.pipe';
import { BudgetAssignmentListComponent } from './budget-assignment-list/budget-assignment-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CurrencyZarPipe,
    BudgetAssignmentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TreeTableModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
