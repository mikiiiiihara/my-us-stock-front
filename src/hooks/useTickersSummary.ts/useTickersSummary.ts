import { useMemo } from "react";
import { TickerDetail } from "../../types/tickerDetail.type";

export const useTickersSummary = (
  tickers: TickerDetail[],
  compareFn: (a: TickerDetail, b: TickerDetail) => number,
  limit: number
) => {
  return useMemo(
    () => tickers.sort(compareFn).slice(0, limit),
    [tickers, compareFn, limit]
  );
};
