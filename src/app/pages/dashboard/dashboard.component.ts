import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { ChartModel } from "../../models/chart.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
  public chartsData$!: Observable<ChartModel[]>;
  public chartStyles = {
    chartColumns: ['Dates', 'Currency'],
    options: {
      height: 500,
      width: 500,
      legend: 'bottom',
      backgroundColor: '#f0f8ff'
    }};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.chartsData$ = this.dashboardService.charts$;
  }
}
