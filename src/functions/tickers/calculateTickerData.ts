import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import { TickerDetail } from "../../types/tickerDetail.type";

export const calculateTickerData = (
  tickers: Ticker[],
  fx: number
): TickerData => {
  let tickerDetail: TickerDetail[] = new Array();
  let getPriceSum = 0;
  let priceSum = 0;
  let dividendSum = 0;
  for (let i = 0; i < tickers?.length; i++) {
    const id = tickers[i].id;
    const usdJpy = tickers[i].usdjpy;
    const ticker = tickers[i].ticker;
    const quantity = tickers[i].quantity;
    const jpyBasedValue = fx === 1 ? 1 : usdJpy;
    const getPrice = tickers[i].getPrice * jpyBasedValue;
    const price = tickers[i].currentPrice * fx;
    const priceGets = tickers[i].priceGets;
    const priceRate = tickers[i].currentRate;
    const dividend = tickers[i].dividend * fx;
    const sector = tickers[i].sector;

    const sumOfDividend = quantity * (dividend * 0.71);
    const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
    const sumOfPrice = Math.round(quantity * price * 10) / 10;
    getPriceSum += sumOfGetPrice;
    priceSum += sumOfPrice;
    dividendSum += sumOfDividend;

    const item: TickerDetail = {
      id: id,
      ticker: ticker,
      quantity: quantity,
      getPrice: getPrice,
      price: price,
      priceGets: priceGets,
      priceRate: priceRate,
      dividend: dividend,
      sumOfDividend: Math.round(sumOfDividend * 100) / 100,
      dividendRate:
        Math.round(((dividend * 0.71 * 100) / getPrice) * 100) / 100,
      sector: sector,
      usdjpy: usdJpy,
      sumOfGetPrice: sumOfGetPrice,
      sumOfPrice: sumOfPrice,
      balance: Math.round((quantity * price - quantity * getPrice) * 10) / 10,
      balanceRate:
        Math.round(
          ((quantity * price - quantity * getPrice) / (quantity * getPrice)) *
            100 *
            10
        ) / 10,
    };
    tickerDetail.push(item);
  }
  // 時価総額の降順にソート
  tickerDetail.sort(function (a, b) {
    if (a.sumOfPrice > b.sumOfPrice) return -1;
    if (a.sumOfPrice < b.sumOfPrice) return 1;
    return 0;
  });
  const tickerData: TickerData = {
    tickerDetail: tickerDetail,
    getPriceTotal: Math.round(getPriceSum * 10) / 10,
    priceTotal: Math.round(priceSum * 10) / 10,
    dividendTotal: Math.round(dividendSum * 10) / 10,
  };
  return tickerData;
};
