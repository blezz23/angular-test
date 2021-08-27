import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as moment from "moment";
import { CurrenciesData, CurrenciesSymbolList } from "../models/currencies.model";

@Injectable({
  providedIn: 'root',
})

export class CurrenciesService {
  constructor(private http: HttpClient) {}

  public getCurrenciesName(): Observable<CurrenciesSymbolList> {
    return this.http.get<CurrenciesSymbolList>(
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
