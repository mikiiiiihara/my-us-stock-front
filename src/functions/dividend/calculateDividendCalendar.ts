import { DivData } from "../../types/divData.type";
import { Dividend } from "../../types/dividend.type";

export const calculateDividendCalendar = (
  currentUsd: number,
  dividendList: Dividend[]
) => {
  let result: DivData[] = new Array();
  for (let data of dividendList) {
    const { ticker, dividend, dividendMonth, quantity } = data;
    if (dividend == 0) {
      continue;
    }
    //１回あたり配当
    let dividendData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i <= 12; i++) {
      if (dividendMonth.includes(i)) {
        dividendData[i - 1] =
          Math.round(dividend * quantity * 0.71 * currentUsd * 100) / 100;
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
