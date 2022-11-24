import { PieData } from "../types/pieData.type";
import { TickerDetail } from "../types/tickerDetail.type";

export const calculateTickerPie = (
  tickerDetail: TickerDetail[],
  priceTotal: number
): PieData[] => {
  let graphData: PieData[] = new Array();
  // 比率計算
  for (let data of tickerDetail) {
    const yData = (100 * data.sumOfPrice) / priceTotal;
    const value = {
      name: data.ticker,
      y: Math.round(yData * 10) / 10,
    };
    graphData.push(value);
  }
  return graphData;
};
