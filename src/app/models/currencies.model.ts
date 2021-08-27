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

export interface CurrenciesSymbolList {
  [key: string]: string;
}
