import { TickerDetail } from "../../../../types/tickerDetail.type";

export type UpdateTickerProps = {
  setShowModal: Function;
  tickers: TickerDetail[];
  executeDeleteTicker: (
    id: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>;
  executeUpdateTicker: (
    id: number,
    getPrice: number,
    quantity: number,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>;
};
