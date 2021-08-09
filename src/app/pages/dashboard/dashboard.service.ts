import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ChartModel } from "../../models/chart.model";
import { ChartType } from "angular-google-charts";

const CHARTS: ChartModel[] = [
  {
  id: 1,
  symbol: 'EUR',
  type: ChartType.LineChart,
  data: [['', 0]],
  show: true,
},
  {
    id: 2,
    symbol: 'GBP',
    type: ChartType.LineChart,
    data: [['', 0]],
    show: true,
  },
  {
    id: 3,
    symbol: 'RUB',
    type: ChartType.LineChart,
    data: [['', 0]],
    show: true,
  },
  {
    id: 4,
    symbol: 'UAH',
    type: ChartType.LineChart,
    data: [['', 0]],
    show: true,
  },
];

@Injectable()

export class DashboardService {
  private _charts$ = new BehaviorSubject<ChartModel[]>([]);
  charts$ = this._charts$.asObservable();

  constructor() {
    this._charts$.next(CHARTS);
  }

  changeVisibility(idList: number[]) {
    const newCharts = this._charts$.value.map(chart => {
      return { ...chart, show: idList.includes(chart.id)}
    });
    this._charts$.next(newCharts)
  }
}
