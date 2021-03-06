import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterService } from "./converter.service";
import { ConverterComponent } from "./converter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ConverterSelectComponent } from "./converter-select/converter-select.component";

@NgModule({
  declarations: [
    ConverterComponent,
    ConverterSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    ConverterService
  ]
})

export class ConverterModule { }
