import { Asset } from "../../../pages/test/calculate-all-assets";
import { UsStockDetail, UsStockSummary } from "./types";

export const summarizeAllAssets = (
  asset: Asset[],
  fx: number
): UsStockSummary => {
  let usStockDetails: UsStockDetail[] = new Array();
  let getPriceSum = 0;
  let priceSum = 0;
  let dividendSum = 0;
  for (let i = 0; i < asset?.length; i++) {
    let value: UsStockDetail;
    switch (asset[i].group) {
      case "usStock":
        value = calculateUsStock(asset[i], fx);
        break;
      case "japanFund":
        value = calculateJapanFund(asset[i]);
        break;
      case "crypto":
        value = calculateCryptos(asset[i]);
        break;
      default:
        value = calculateFixedIncomeAsset(asset[i]);
    }
    const { sumOfGetPrice, sumOfPrice, sumOfDividend } = value;
    // 合計値に加算
    getPriceSum += sumOfGetPrice;
    priceSum += sumOfPrice;
    dividendSum += sumOfDividend;

    usStockDetails.push(value);
  }
  // 時価総額の降順にソート
  usStockDetails.sort(function (a, b) {
    if (a.sumOfPrice > b.sumOfPrice) return -1;
    if (a.sumOfPrice < b.sumOfPrice) return 1;
    return 0;
  });
  const tickerData: UsStockSummary = {
    usStockDetails: usStockDetails,
    getPriceTotal: Math.round(getPriceSum * 10) / 10,
    priceTotal: Math.round(priceSum * 10) / 10,
    dividendTotal: Math.round(dividendSum * 10) / 10,
  };
  return tickerData;
};

// 米国株式のサマリーを計算
const calculateUsStock = (asset: Asset, fx: number): UsStockDetail => {
  const { id, usdJpy, code, quantity, priceGets, sector } = asset;
  const getPrice = asset.getPrice * usdJpy;
  const price = asset.currentPrice * fx;
  const priceRate = asset.currentRate;
  const dividend = asset.dividend * fx;

  const sumOfDividend = quantity * (dividend * 0.71);
  const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
  const sumOfPrice = Math.round(quantity * price * 10) / 10;

  return {
    id,
    code,
    quantity,
    getPrice,
    price,
    priceGets,
    priceRate,
    dividend,
    sumOfDividend: Math.round(sumOfDividend * 100) / 100,
    dividendRate: Math.round(((dividend * 0.71 * 100) / getPrice) * 100) / 100,
    sector,
    usdJpy,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((quantity * price - quantity * getPrice) * 10) / 10,
    balanceRate:
      Math.round(
        ((quantity * price - quantity * getPrice) / (quantity * getPrice)) *
          100 *
          10
      ) / 10,
  };
};

// 日本投資信託のサマリーを計算
const calculateJapanFund = (asset: Asset): UsStockDetail => {
  const {
    id,
    usdJpy,
    code,
    quantity,
    priceGets,
    sector,
    getPrice,
    getPriceTotal,
    currentPrice,
  } = asset;
  const priceRate = asset.currentRate;
  const dividend = 0;

  const sumOfGetPrice = getPriceTotal;
  const sumOfPrice = (getPriceTotal * currentPrice) / getPrice;
  return {
    id,
    code,
    quantity,
    getPrice,
    price: currentPrice,
    priceGets,
    priceRate,
    dividend,
    sumOfDividend: 0,
    dividendRate: 0,
    sector,
    usdJpy,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((sumOfPrice - getPriceTotal) * 10) / 10,
    balanceRate:
      Math.round(((sumOfPrice - getPriceTotal) / sumOfGetPrice) * 100 * 10) /
      10,
  };
};

// 仮想通貨のサマリーを計算
const calculateCryptos = (asset: Asset): UsStockDetail => {
  const { id, code, quantity, priceGets, sector, currentPrice } = asset;
  const getPrice = asset.getPrice;
  const priceRate = asset.currentRate;

  const sumOfGetPrice = Math.round(quantity * getPrice * 10) / 10;
  // 合計評価額
  const sumOfPrice = Math.round(quantity * currentPrice * 10) / 10;
  return {
    id,
    code,
    quantity,
    getPrice,
    price: currentPrice,
    priceGets,
    priceRate,
    dividend: 0,
    sumOfDividend: 0,
    dividendRate: 0,
    sector,
    usdJpy: 1,
    sumOfGetPrice,
    sumOfPrice,
    balance: Math.round((sumOfPrice - sumOfGetPrice) * 10) / 10,
    balanceRate:
      Math.round(((sumOfPrice - sumOfGetPrice) / sumOfGetPrice) * 100 * 10) /
      10,
  };
};

// 固定利回り資産のサマリーを計算
const calculateFixedIncomeAsset = (asset: Asset): UsStockDetail => {
  const {
    id,
    usdJpy,
    code,
    quantity,
    priceGets,
    sector,
    getPrice,
    getPriceTotal,
    currentPrice,
    dividend,
  } = asset;
  const priceRate = asset.currentRate;

  const sumOfDividend = dividend * 0.8;
  return {
    id,
    code,
    quantity,
    getPrice,
    price: currentPrice,
    priceGets,
    priceRate,
    dividend,
    sumOfDividend,
    dividendRate: (100 * dividend) / getPriceTotal,
    sector,
    usdJpy,
    sumOfGetPrice: getPriceTotal,
    sumOfPrice: getPriceTotal,
    balance: 0,
    balanceRate: 0,
  };
};
