import {
  Crypto,
  FixedIncomeAsset,
  JapanFund,
  UsStock,
} from "../../gql/graphql";

export type AllAssets = {
  usStocks: UsStock[];
  japanFunds: JapanFund[];
  cryptos: Crypto[];
  fixedIncomeAssets: FixedIncomeAsset[];
};

export type Asset = {
  code: string;
  currentPrice: number;
  currentRate: number;
  dividend: number;
  getPrice: number;
  getPriceTotal: number;
  id: number;
  priceGets: number;
  quantity: number;
  sector: string;
  usdJpy: number;
  group: string;
};

export const CaluculateAllAssets = (allAssets: AllAssets) => {
  const { usStocks, japanFunds, cryptos, fixedIncomeAssets } = allAssets;
  const response: Asset[] = new Array();
  // 米国株情報をセット
  usStocks.map((usStock) => {
    const asset: Asset = {
      id: parseInt(usStock.id),
      code: usStock.code,
      currentPrice: usStock.currentPrice,
      currentRate: usStock.currentRate,
      dividend: usStock.dividend,
      getPrice: usStock.getPrice,
      getPriceTotal: usStock.getPrice,
      priceGets: usStock.priceGets,
      quantity: usStock.quantity,
      sector: usStock.sector,
      usdJpy: usStock.usdJpy,
      group: "usStock",
    };
    response.push(asset);
  });
  // 日本投資信託をセット
  japanFunds.map((japanFund) => {
    const asset: Asset = {
      id: parseInt(japanFund.id),
      code: japanFund.name,
      currentPrice: japanFund.currentPrice,
      currentRate: 0,
      dividend: 0,
      getPrice: japanFund.getPrice,
      getPriceTotal: japanFund.getPriceTotal,
      priceGets: 0,
      quantity: 1,
      sector: "japanFund",
      usdJpy: 1,
      group: "japanFund",
    };
    response.push(asset);
  });
  // 仮想通貨をセット
  cryptos.map((crypto) => {
    const asset: Asset = {
      id: parseInt(crypto.id),
      code: crypto.code,
      currentPrice: crypto.currentPrice,
      currentRate: 0,
      dividend: 0,
      getPrice: crypto.getPrice,
      getPriceTotal: crypto.getPrice,
      priceGets: 0,
      quantity: crypto.quantity,
      sector: "crypto",
      usdJpy: 1,
      group: "crypto",
    };
    response.push(asset);
  });
  // 固定利回り資産をセット
  fixedIncomeAssets.map((fixedIncomeAsset) => {
    const asset: Asset = {
      id: parseInt(fixedIncomeAsset.id),
      code: fixedIncomeAsset.code,
      currentPrice: 0,
      currentRate: 0,
      dividend:
        (fixedIncomeAsset.dividendRate * fixedIncomeAsset.getPriceTotal) / 100,
      getPrice: 0,
      getPriceTotal: fixedIncomeAsset.getPriceTotal,
      priceGets: 0,
      quantity: 1,
      sector: "fixedIncomeAsset",
      usdJpy: fixedIncomeAsset.usdJpy ?? 1,
      group: "fixedIncomeAsset",
    };
    response.push(asset);
  });
  return response;
};
