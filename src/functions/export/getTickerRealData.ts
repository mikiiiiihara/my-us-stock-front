import { SectorTickerList } from "../../constants/sectorTickerList";
import { MarketData } from "../../types/marketData.type";
import { TickerRealData } from "../../types/tickerRealData.type";

export const getTickerRealData = (realData: MarketData[]): TickerRealData[] => {
  let tickerRealData: TickerRealData[] = new Array();
  if (realData != undefined) {
    for (let i = 0; i < realData.length; i++) {
      const ticker = SectorTickerList.find(
        (e) => e.ticker === realData[i].ticker
      )?.describe;
      const item: TickerRealData = {
        ticker: ticker || "",
        c: realData[i].currentPrice,
        d: realData[i].priceGets,
        dp: Math.round(realData[i].currentRate * 100) / 100,
      };
      tickerRealData.push(item);
    }
  }
  tickerRealData.sort(function (a, b) {
    if (a.dp > b.dp) return -1;
    if (a.dp < b.dp) return 1;
    return 0;
  });
  return tickerRealData;
};
