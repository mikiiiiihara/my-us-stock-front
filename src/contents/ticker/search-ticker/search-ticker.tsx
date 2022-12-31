import React, { useEffect, useState } from "react";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { TickerDetail } from "../../../types/tickerDetail.type";

type Props = {
  tickers: TickerDetail[];
  selectedFx: string;
};
export const SearchTicker: React.FC<Props> = ({ tickers, selectedFx }) => {
  const [tickerList, setTickerList] = useState(tickers);
  useEffect(() => {
    setTickerList(tickers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFx]);
  // 検索値で値を書き換え
  const search = (searchValue: string) => {
    const result = tickers
      .map((ticker) => {
        if (
          ticker.ticker.includes(searchValue) ||
          ticker.sector.includes(searchValue)
        )
          return ticker;
      })
      .filter((ticker): ticker is Exclude<typeof ticker, undefined> => {
        return ticker !== undefined;
      });
    if (result) {
      setTickerList(result);
    } else {
      setTickerList(tickers);
    }
  };
  // 値上がりTOP3
  const dataPriceRateDesc = tickers
    .sort(function (a, b) {
      if (a.priceRate > b.priceRate) return -1;
      if (a.priceRate < b.priceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 値下がりTOP3
  const dataPriceRateAsc = tickers
    .sort(function (a, b) {
      if (a.priceRate < b.priceRate) return -1;
      if (a.priceRate > b.priceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（額）TOP3
  const dataBalanceDesc = tickers
    .sort(function (a, b) {
      if (a.balance > b.balance) return -1;
      if (a.balance < b.balance) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み損（額）TOP3
  const dataBalanceAsc = tickers
    .sort(function (a, b) {
      if (a.balance < b.balance) return -1;
      if (a.balance > b.balance) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（率）TOP3
  const dataBalanceRateDesc = tickers
    .sort(function (a, b) {
      if (a.balanceRate > b.balanceRate) return -1;
      if (a.balanceRate < b.balanceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（率）TOP3
  const dataBalanceRateAsc = tickers
    .sort(function (a, b) {
      if (a.balanceRate < b.balanceRate) return -1;
      if (a.balanceRate > b.balanceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  return (
    <>
      <div className="content">
        <h2>保有株一覧</h2>
        <input
          type="text"
          className="form-control search-text"
          placeholder="銘柄名、セクターを検索"
          onChange={(e) => search(e.target.value)}
        />
        <TickerPanel tickerDetail={tickerList} currency={selectedFx} />
        <div className="clear-both"></div>
      </div>
      <div className="content">
        <h2>値上がりTOP3</h2>
        <TickerPanel tickerDetail={dataPriceRateDesc} currency={selectedFx} />
        <div className="clear-both"></div>
        <h2>値下がりTOP3</h2>
        <TickerPanel tickerDetail={dataPriceRateAsc} currency={selectedFx} />
        <div className="clear-both"></div>
        <h2>含み益（額）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceDesc}
          currency={selectedFx}
          displayType="balance"
        />
        <div className="clear-both"></div>
        <h2>含み損（額）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceAsc}
          currency={selectedFx}
          displayType="balance"
        />
        <div className="clear-both"></div>
        <h2>含み益（率）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceRateDesc}
          currency={selectedFx}
          displayType="balanceRate"
        />
        <div className="clear-both"></div>
        <h2>含み損（率）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceRateAsc}
          currency={selectedFx}
          displayType="balanceRate"
        />
        <div className="clear-both"></div>
      </div>
    </>
  );
};
