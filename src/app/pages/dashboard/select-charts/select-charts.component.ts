import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from "../dashboard.service";
import { Observable, Subject } from "rxjs";
import { ChartModel } from "../../../models/chart.model";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'select-charts',
  templateUrl: './select-charts.component.html',
  styleUrls: ['./select-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SelectChartsComponent implements OnInit, OnDestroy {
  public chartsData$!: Observable<ChartModel[]>;
  public chartsFormControl = new FormControl();
  private _unsubscribeAll = new Subject();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.chartsData$ = this.dashboardService.charts$;
    this.chartsData$.pipe(
      takeUntil(this._unsubscribeAll)
    )
      .subscribe(charts => {
        this.chartsFormControl.patchValue(
          charts
            .filter(chart => chart.show)
            .map(chart => chart.id),
          {emitEvent: false})
      });
    this.chartsFormControl.valueChanges.pipe(
      takeUntil(this._unsubscribeAll)
    )
      .subscribe(value => this.dashboardService.changeVisibility(value));
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
