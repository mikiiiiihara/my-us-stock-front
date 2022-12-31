import { TickerDetail } from "../../types/tickerDetail.type";

export const sortTickers = (tickers: TickerDetail[]) => {
  const result = tickers.map((ticker) => {
    return ticker;
  });
  return result.sort(function (a, b) {
    if (a.ticker < b.ticker) return -1;
    if (a.ticker > b.ticker) return 1;
    return 0;
  });
};
