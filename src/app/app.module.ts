import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { AppRoutingModule } from './app-routing.module';

import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenubarModule } from 'primeng/menubar';

import { CurrencyZarPipe } from './currency-zar.pipe';

import { BudgetAssignmentListComponent } from './budget-assignment-list/budget-assignment-list.component';
import { BudgetAssignmentCreatorComponent } from './budget-assignment-creator/budget-assignment-creator.component';
import { TopAppBarComponent } from './top-app-bar/top-app-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CurrencyZarPipe,
    BudgetAssignmentListComponent,
    BudgetAssignmentCreatorComponent,
    TopAppBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TreeTableModule,
    TableModule,
    CalendarModule,
    ListboxModule,
    SelectButtonModule,
    InputTextModule,
    CardModule,
    DividerModule,
    PanelModule,
    RippleModule,
    AutoCompleteModule,
    ToastModule,
    InputNumberModule,
    OverlayPanelModule,
    MenubarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
