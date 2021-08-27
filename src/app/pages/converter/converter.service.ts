import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ConverterModel } from "../../models/converter.model";
import { CurrenciesService} from "../../services/currencies.service";
import { CurrenciesAmount, CurrenciesData, CurrenciesSymbolList } from "../../models/currencies.model";

const DEFAULT_DATA = [{
  id: 1,
  symbol: '',
  fullName: '',
  amount: 0
}, {
  id: 2,
  symbol: '',
  fullName: '',
  amount: 0
}];

@Injectable()

export class ConverterService {
  private _convertersState$ = new BehaviorSubject<ConverterModel[]>([]);
  readonly convertersState$ = this._convertersState$.asObservable();
  private _currenciesFullNameList$ = new BehaviorSubject<string[]>([]);
  readonly currenciesFullNameList$ = this._currenciesFullNameList$.asObservable();
  private currenciesSymbolList?: CurrenciesSymbolList;
  private currenciesAmountList?: CurrenciesAmount;

  constructor(
    private currenciesService: CurrenciesService
  ) {
    this._convertersState$.next(DEFAULT_DATA);
    this.getCurrenciesName();
  }

  private getCurrenciesName() {
    this.currenciesService.getCurrenciesName().subscribe(
      (data: CurrenciesSymbolList) => {
        this.currenciesSymbolList = data;
        this._currenciesFullNameList$.next(Object.values(data));
        this.getCurrenciesAmount(data);
      });
  }

  private getCurrenciesAmount(data: CurrenciesSymbolList) {
    this.currenciesService.getCurrenciesAmount(new Date, Object.keys(data))
      .subscribe(
        (data: CurrenciesData) => {
          this.currenciesAmountList = data.rates;
        }
      )
  }

  public onChanges(currencyName: string, id: number) {
    if (this.currenciesAmountList) {
      for (let symbol in this.currenciesSymbolList) {
        if (this.currenciesSymbolList[symbol] === currencyName) {
          const amount = this.currenciesAmountList[symbol];
          const newConverterState = this._convertersState$.value.map(converterItem => {
            return converterItem.id === id
              ? { id: id, symbol: symbol, fullName: currencyName, amount: amount }
              : converterItem
          });
          this._convertersState$.next(newConverterState);
        }
      }
    }
  }

  public getResult(): number {
    const amount1 = this._convertersState$.value[0].amount;
    const amount2 = this._convertersState$.value[1].amount;

    if (amount1 !== 0 && amount2 !== 0) {
      return +(amount1/amount2).toFixed(3);
    }
    return 0;
  }
}
