import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ConverterModel} from "../../models/converter.model";
import {
  CurrenciesService,
  CurrenciesAmount,
  CurrenciesData, CurrenciesList
} from "../../services/currencies.service";

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
        for (let converter in this.convertersState) {
          if (this.convertersState[converter].id === id && this.convertersState.hasOwnProperty(converter) && this.currenciesAmountList) {
            this.convertersState[converter] = {
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
    if (this.convertersState[0].amount !== 0 && this.convertersState[1].amount !== 0) {
      return +(this.convertersState[0].amount/this.convertersState[1].amount).toFixed(4);
    }
    return 0;
  }
}
