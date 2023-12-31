export type UsStockDetail = {
  id: number;
  code: string;
  quantity: number;
  getPrice: number;
  price: number;
  priceGets: number;
  priceRate: number;
  dividend: number;
  sumOfDividend: number;
  dividendRate: number;
  sector: string;
  usdJpy: number;
  sumOfGetPrice: number;
  sumOfPrice: number;
  balance: number;
  balanceRate: number;
};

export type UsStockSummary = {
  usStockDetails: UsStockDetail[];
  getPriceTotal: number;
  priceTotal: number;
  dividendTotal: number;
};
