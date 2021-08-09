import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { SelectChartsComponent } from "./select-charts/select-charts.component";
import { DashboardService } from "./dashboard.service";
import { GoogleChartsModule } from "angular-google-charts";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DashboardComponent,
    SelectChartsComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
