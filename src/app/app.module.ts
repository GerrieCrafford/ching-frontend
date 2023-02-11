import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { AppRoutingModule } from './app-routing.module';

import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [AppComponent, OverviewComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, TreeTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
