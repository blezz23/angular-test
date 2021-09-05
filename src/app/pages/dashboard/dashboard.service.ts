import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ChartModel } from "../../models/chart.model";
import { ChartType } from "angular-google-charts";
import { CurrenciesService } from "../../services/currencies.service";
import * as moment from 'moment';
import { CurrenciesData } from "../../models/currencies.model";

const DEFAULT_DATA = ['', 0];
const FREEZE_OPTIONS = {
  height: 500,
  width: 500,
};
const DEFAULT_OPTIONS = {
  height: FREEZE_OPTIONS.height,
  width: FREEZE_OPTIONS.width,
  legend: 'bottom',
  backgroundColor: '#f0f8ff'
};

const CHARTS: ChartModel[] = [
  {
    id: 1,
    symbol: 'EUR',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
    options: {
      ...DEFAULT_OPTIONS,
      title: 'Euro'
    }
  },
  {
    id: 2,
    symbol: 'GBP',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
    options: {
      ...DEFAULT_OPTIONS,
      title: 'British Pound Sterling'
    }
  },
  {
    id: 3,
    symbol: 'RUB',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
    options: {
      ...DEFAULT_OPTIONS,
      title: 'Russian Ruble'
    }
  },
  {
    id: 4,
    symbol: 'UAH',
    type: ChartType.LineChart,
    data: [DEFAULT_DATA],
    show: true,
    options: {
      ...DEFAULT_OPTIONS,
      title: 'Ukrainian Hryvnia'
    }
  },
];

@Injectable()

export class DashboardService {
  private _charts$ = new BehaviorSubject<ChartModel[]>([]);
  readonly charts$ = this._charts$.asObservable();

  private currenciesSymbols: string[] = [];

  private _blockDates$ = new BehaviorSubject<Date[]>([new Date()]);
  readonly blockDates$ = this._blockDates$.asObservable();

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
      return chart.show === show ? chart : { ...chart, show }
    });
    this.setCharts(newCharts);
  }

  public addDate(date: Date) {
    const formatDate = moment(date).format('YYYY-MM-DD');
    this._blockDates$.next([...this._blockDates$.value, date]);

    this.currenciesService.getCurrenciesAmount(date, this.currenciesSymbols)
      .subscribe((data: CurrenciesData) => {
        const newCharts = this._charts$.value.map(chart => {
          let newData = [formatDate, data.rates[chart.symbol]];
          return chart.data[0] === DEFAULT_DATA
            ? { ...chart, data: [newData] }
            : { ...chart, data: [...chart.data, newData].sort() }
        });
        this.setCharts(newCharts);
      })
  }

  public setOptions(id: number, chartType: ChartType, options: object) {
    const newCharts = this._charts$.value.map(chart => {
      return chart.id === id
        ? { ...chart, type: chartType,
          options: { ...options, height: FREEZE_OPTIONS.height, width: FREEZE_OPTIONS.width } }
        : chart
    });
    this.setCharts(newCharts);
  }
}
