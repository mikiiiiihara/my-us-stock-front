import { DivData } from "../../types/divData.type";
import { TickerDetail } from "../../types/tickerDetail.type";

export const calculateDividendCalendar = (tickerDetail: TickerDetail[]) => {
  let result: DivData[] = new Array();
  for (let data of tickerDetail) {
    const ticker = data.ticker;
    const dividend = data.sumOfDividend;
    if (dividend == 0) {
      continue;
    }
    const dividendTime = data.dividendTime;
    const dividendFirstTime = data.dividendFirstTime;
    // 頻度の計算
    const interval = 12 / dividendTime;
    // 配当月管理用
    let count = dividendFirstTime;
    //１回あたり配当
    const initDividend = Math.round((dividend / dividendTime) * 100) / 100;
    let dividendData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i <= 12; i++) {
      if (count == i) {
        dividendData[i - 1] = initDividend;
        count += interval;
      }
    }
    const item: DivData = {
      name: ticker,
      data: dividendData,
    };
    result.push(item);
  }
  return result;
};
