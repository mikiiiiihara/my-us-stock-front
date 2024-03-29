import { PieData } from "../../types/pieData.type";
import { TickerDetail } from "../../types/tickerDetail.type";

export const calculateTickerPie = (tickerDetail: TickerDetail[]): PieData[] => {
  let graphData: PieData[] = new Array();
  // 比率計算
  for (let data of tickerDetail) {
    const yData = data.sumOfPrice;
    const value = {
      name: data.ticker,
      y: Math.round(yData * 10) / 10,
    };
    graphData.push(value);
  }
  return graphData.sort(function (a, b) {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
  });
};
