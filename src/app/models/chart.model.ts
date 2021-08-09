import { ChartType } from "angular-google-charts";

export interface ChartModel {
  id: number;
  symbol: string;
  type: ChartType;
  data: Array<[string, number]>;
  show: boolean;
}
