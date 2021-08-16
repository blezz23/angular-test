import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ConverterModel } from "../../models/converter.model";
import { ConverterService } from "./converter.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConverterComponent implements OnInit {
  public convertersData$!: Observable<ConverterModel[]>;
  public currenciesFullNameList$!: Observable<string[]>;
  public result = 0;

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    this.convertersData$ = this.converterService.converters$;
    this.currenciesFullNameList$ = this.converterService.currenciesFullNameList$;
  }

  public onChanges(currencyName: string, id: number) {
    this.converterService.onChanges(currencyName, id);
    this.result = this.converterService.getResult();
  }
}
