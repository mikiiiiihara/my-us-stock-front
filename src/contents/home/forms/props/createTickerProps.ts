export type CreateTickerProps = {
  setShowModal: Function;
  executeCreateTicker: (
    ticker: string,
    getPrice: number,
    quantity: number,
    sector: string,
    usdjpy: number,
    currentPrice: number,
    priceGets: number,
    currentRate: number
  ) => Promise<void>; // 保有株式情報追加関数
};
