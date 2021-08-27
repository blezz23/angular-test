import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from "../dashboard.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DatepickerComponent implements OnInit, OnDestroy {
  private today = new Date();
  private endDate = new Date('January 1, 1999');
  private blockDates?: Date[] = [];
  private _unsubscribeAll = new Subject();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.blockDates$.pipe(
      takeUntil(this._unsubscribeAll)
    )
      .subscribe((dates) => {
      this.blockDates = dates;
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  possibleDate = (d: Date | null): boolean => {
    return (d || new Date()) <= this.today && (d || new Date()) >= this.endDate
      && !this.blockDates?.find(date => date.toDateString() === d?.toDateString());
  };

  public changeDate(date: Date | null) {
    if (date) {
      this.dashboardService.addDate(date);
    }
  }
}
