import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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

@Injectable({
  providedIn: 'root',
})

export class CurrenciesService {
  constructor(private http: HttpClient) {}

  public getCurrenciesName(): Observable<CurrenciesList> {
    return this.http.get<CurrenciesList>(
      'currencies.json')
      .pipe(catchError(CurrenciesService.handleError));
  }

  public getCurrenciesAmount(date: Date, symbols: string[]): Observable<CurrenciesData> {
    const formatDate = moment(date).utc().format('YYYY-MM-DD');
    return this.http.get<CurrenciesData>(
      `historical/${formatDate}.json`,
      {params: { 'symbols': symbols.join(',') }})
      .pipe(catchError(CurrenciesService.handleError));
  }

  static handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
