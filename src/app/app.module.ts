import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainModule } from "./layouts/main/main.module";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from "./pages/home/home.module";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ConverterModule } from "./pages/converter/converter.module";
import {APIInterceptor} from "./api-interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    DashboardModule,
    HttpClientModule,
    ConverterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
