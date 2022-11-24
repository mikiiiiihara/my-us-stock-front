import { TickerDetail } from "./tickerDetail.type";

export type TickerData = {
  tickerDetail: TickerDetail[];
  getPriceTotal: number;
  priceTotal: number;
  dividendTotal: number;
};
