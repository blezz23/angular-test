import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ChartModel } from "../../models/chart.model";
import { ChartType } from "angular-google-charts";
import { CurrenciesService, CurrenciesData } from "../../services/currencies.service";
import * as moment from 'moment';

const DEFAULT_DATA = ['', 0];

const CHARTS: ChartModel[] = [
  {
    id: 1,
    symbol: 'EUR',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
  },
  {
    id: 2,
    symbol: 'GBP',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
  },
  {
    id: 3,
    symbol: 'RUB',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
  },
  {
    id: 4,
    symbol: 'UAH',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
  },
];

@Injectable()

export class DashboardService {
  private _charts$ = new BehaviorSubject<ChartModel[]>([]);
  readonly charts$ = this._charts$.asObservable();
  private currenciesSymbols: string[] = [];

  constructor(
    private currenciesService: CurrenciesService
  ) {
    this.setCharts(CHARTS);
    this.addDate(new Date);
  }

  private setCharts(charts: ChartModel[]) {
    this._charts$.next(charts);
    this.currenciesSymbols = charts.map(chart => chart.symbol);
  }

  public changeVisibility(idList: number[]) {
    const newCharts = this._charts$.value.map(chart => {
      const show = idList.includes(chart.id);
      return chart.show === show ? chart : {...chart, show}
    });
    this.setCharts(newCharts)
  }

  public addDate(date: Date) {
    const formatDate = moment(date).format('YYYY-MM-DD');

    this.currenciesService.getCurrenciesAmount(date, this.currenciesSymbols)
      .subscribe((data: CurrenciesData) => {
        const newCharts = this._charts$.value.map(chart => {
          let newData = [formatDate, data.rates[chart.symbol]];
          return chart.data[0] === DEFAULT_DATA
            ? {...chart, data: [newData]}
            : {...chart, data: [...chart.data, newData]}
        });
        this.setCharts(newCharts);
      })
  }
}
