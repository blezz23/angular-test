import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { SelectChartsComponent } from "./select-charts/select-charts.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { DashboardService } from "./dashboard.service";
import { GoogleChartsModule } from "angular-google-charts";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    DashboardComponent,
    SelectChartsComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    GoogleChartsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
