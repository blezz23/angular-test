import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardService } from "../dashboard.service";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DatepickerComponent {
  private today = new Date()
  private endDate = new Date('January 1, 1999');

  constructor(private dashboardService: DashboardService) {}

  possibleDate = (d?: Date| null): boolean => {
    return (d || new Date()) <= this.today && (d || new Date()) >= this.endDate;
  }

  public changeDate(date?: Date | null) {
    if (date) {
      this.dashboardService.addDate(date);
    }
  }
}
