import { Component } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from "../dashboard.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})

export class DatepickerComponent {
  private today = new Date()
  private endDate = new Date('January 1, 1999');
  private cost = 1;

  constructor(public dashboardService: DashboardService) {}

  possibleDate = (d: Date| null): boolean => {
    return (d || new Date()) <= this.today && (d || new Date()) >= this.endDate;
  }

  changeDate($event: MatDatepickerInputEvent<Date, Date | null>) {
    const formatDate = moment($event.value).format('YYYY-MM-DD');
    this.dashboardService.addData(formatDate, this.cost);
  }
}
