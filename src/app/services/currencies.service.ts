import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as moment from "moment";

export interface CurrenciesAmount {
  [key: string]: number;
}

export interface CurrenciesData {
  base: string;
  rates: CurrenciesAmount;
  disclaimer: string;
  license: string;
  timestamp: number;
}

export interface CurrenciesList {
  [key: string]: string;
}

const params = new HttpParams()
  .set('app_id', "813c11eb31034b44a46129fceaa995b7")
  .set('base', "USD")

@Injectable({
  providedIn: 'root',
})

export class CurrenciesService {
  readonly ROOT_URL = 'https://openexchangerates.org/api/'

  constructor(private http: HttpClient) {}

  public getCurrenciesName(): Observable<CurrenciesList> {
    return this.http.get<CurrenciesList>(
      this.ROOT_URL + 'currencies.json')
      .pipe(catchError(CurrenciesService.handleError));
  }

  public getCurrenciesAmount(date: Date, symbols: string[]): Observable<CurrenciesData> {
    const formatDate = moment(date).utc().format('YYYY-MM-DD');
    return this.http.get<CurrenciesData>(
      this.ROOT_URL + `historical/${formatDate}.json`,
      {params: params.set('symbols', symbols.join(','))})
      .pipe(catchError(CurrenciesService.handleError));
  }

  static handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
