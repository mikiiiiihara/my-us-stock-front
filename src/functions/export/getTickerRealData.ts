import { SectorTickerList } from "../../constants/sectorTickerList";
import { MarketData } from "../../types/marketData.type";
import { TickerRealData } from "../../types/tickerRealData.type";

export const getTickerRealData = (
  tickerList: string[],
  realData: MarketData[]
): TickerRealData[] => {
  let tickerRealData: TickerRealData[] = new Array();
  if (realData != undefined) {
    for (let i = 0; i < realData.length; i++) {
      const ticker = SectorTickerList.find(
        (e) => e.ticker === tickerList[i]
      )?.describe;
      const item: TickerRealData = {
        ticker: ticker || "",
        c: realData[i].c,
        d: realData[i].d,
        dp: Math.round(realData[i].dp * 100) / 100,
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
