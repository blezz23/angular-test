import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ConverterService } from "../converter.service";
import { ConverterComponent } from "../converter.component";

@Component({
  selector: 'converter-select',
  templateUrl: './converter-select.component.html',
  styleUrls: ['./converter-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConverterSelectComponent implements OnInit {
  public currenciesFullNameList$?: Observable<string[]>;
  @Input() selectId: number = 0;
  @Input() selectFullName: string = '';
  @Input() selectAmount: number = 0;

  constructor(
    private converterService: ConverterService,
    private converterComponent: ConverterComponent
  ) {}

  ngOnInit() {
    this.currenciesFullNameList$ = this.converterService.currenciesFullNameList$;
  }

  public onChanges(currencyName: string, id: number) {
    this.converterComponent.onChanges(currencyName, id);
  }
}
