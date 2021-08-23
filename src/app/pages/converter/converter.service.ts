import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ConverterModel } from "../../models/converter.model";
import { CurrenciesService, CurrenciesAmount, CurrenciesData, CurrenciesList} from "../../services/currencies.service";

@Injectable()

export class ConverterService {
  private _converters$ = new BehaviorSubject<ConverterModel[]>([]);
  readonly converters$ = this._converters$.asObservable();
  private _currenciesFullNameList$ = new BehaviorSubject<string[]>([]);
  readonly currenciesFullNameList$ = this._currenciesFullNameList$.asObservable();
  private currenciesList?: CurrenciesList;
  private currenciesAmountList?: CurrenciesAmount;
  private convertersState = [{
    id: 1,
    symbol: '',
    fullName: '',
    amount: 0
  }, {
    id: 2,
    symbol: '',
    fullName: '',
    amount: 0
  }]

  constructor(
    private currenciesService: CurrenciesService
  ) {
    this._converters$.next(this.convertersState)
    this.getCurrenciesName();
  }

  private getCurrenciesName() {
    this.currenciesService.getCurrenciesName().subscribe(
      (data: CurrenciesList) => {
        this.currenciesList = data;
        this._currenciesFullNameList$.next(Object.values(data));
        this.getCurrenciesAmount(data);
      });
  }

  private getCurrenciesAmount(data: CurrenciesList) {
    this.currenciesService.getCurrenciesAmount(new Date, Object.keys(data))
      .subscribe(
        (data: CurrenciesData) => {
          this.currenciesAmountList = data.rates;
        }
      )
  }

  public onChanges(currencyName: string, id: number) {
    for (let symbol in this.currenciesList) {
      if (this.currenciesList[symbol] === currencyName && this.currenciesList.hasOwnProperty(symbol)) {
        for (let converterItem in this.convertersState) {
          if (this.convertersState[converterItem].id === id && this.convertersState.hasOwnProperty(converterItem) && this.currenciesAmountList!) {
            this.convertersState[converterItem] = {
                id: id,
                symbol: symbol,
                fullName: currencyName,
                amount: this.currenciesAmountList[symbol]
            }
          }
          this._converters$.next(this.convertersState)
        }
      }
    }
  }

  public getResult(): number {
    const amount1 = this.convertersState[0].amount;
    const amount2 = this.convertersState[1].amount;

    if (amount1 !== 0 && amount2 !== 0) {
      return +(amount1/amount2).toFixed(4);
    }
    return 0;
  }
}
