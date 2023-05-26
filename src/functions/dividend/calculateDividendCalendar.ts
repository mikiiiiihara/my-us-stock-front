import { DivData } from "../../types/divData.type";
import { Dividend } from "../../types/dividend.type";

export const calculateDividendCalendar = (
  currentUsd: number,
  dividendList: Dividend[]
) => {
  let result: DivData[] = new Array();
  for (let data of dividendList) {
    const { ticker, dividend, dividendMonth, quantity, dividendTime } = data;
    if (dividend == 0) {
      continue;
    }
    // 配当月管理用
    let count = dividendMonth[0];
    // 間隔
    const interval = 12 / dividendTime;
    //１回あたり配当
    let dividendData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i <= 12; i++) {
      if (count == i) {
        dividendData[i - 1] =
          Math.round(dividend * quantity * 0.71 * currentUsd * 100) / 100;
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
