import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { ChartModel } from "../../models/chart.model";
import { Observable } from "rxjs";
import {ChartBase, ChartEditorComponent, ChartType} from "angular-google-charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
  public chartsData$!: Observable<ChartModel[]>;
  public chartColumns = ['Dates', 'Currency'];

  @ViewChild(ChartEditorComponent)
  public readonly editor?: ChartEditorComponent;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.chartsData$ = this.dashboardService.charts$;
  }

  public editChart(chart: ChartBase, id: number) {
    this.editor?.editChart(chart)
      .afterClosed()
      .subscribe( result => {
        if (result) {
          this.dashboardService.setOptions(id, result.getChartType() as ChartType, result.getOptions())
        }
      })
  }
}
