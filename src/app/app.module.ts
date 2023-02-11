import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, OverviewComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
