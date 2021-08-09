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
  readonly charts$ = this._charts$.asObservable();

  constructor() {
    this._charts$.next(CHARTS);
  }

  changeVisibility(idList: number[]) {
    const newCharts = this._charts$.value.map(chart => {
      const show = idList.includes(chart.id)
      return chart.show === show ? chart : { ...chart, show }
    });
    this._charts$.next(newCharts)
  }

  addData(date: string, cost: number) {
    const newCharts = this._charts$.value.map(chart => {
      let newData: [string, number] = [date, cost];
      if (chart.data[0].includes(0)) {
        return { ...chart, data: [newData] }
      } else {
        return { ...chart, data: chart.data.concat([newData]) }
      }
    });
    this._charts$.next(newCharts);
  }
}
