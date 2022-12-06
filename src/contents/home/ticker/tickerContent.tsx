import React, { FC, useState } from "react";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { TickerDetail } from "../../../types/tickerDetail.type";

type Props = {
  tickerDetail: TickerDetail[];
  currency: string;
};

export const TickerContent: FC<Props> = ({ tickerDetail, currency }) => {
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const tickerDetailValue = tickerDetail.map((ticker) => {
    return ticker;
  });
  tickerDetailValue.sort(function (a, b) {
    if (a.ticker < b.ticker) return -1;
    if (a.ticker > b.ticker) return 1;
    return 0;
  });
  const [tickerList, setTickerList] = useState(tickerDetailValue);
  // 検索値で値を書き換え
  const search = (searchValue: string) => {
    const result = tickerDetailValue
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
      setTickerList(tickerDetailValue);
    }
  };
  // 値上がりTOP3
  const dataPriceRateDesc = tickerDetail
    .sort(function (a, b) {
      if (a.priceRate > b.priceRate) return -1;
      if (a.priceRate < b.priceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 値下がりTOP3
  const dataPriceRateAsc = tickerDetail
    .sort(function (a, b) {
      if (a.priceRate < b.priceRate) return -1;
      if (a.priceRate > b.priceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（額）TOP3
  const dataBalanceDesc = tickerDetail
    .sort(function (a, b) {
      if (a.balance > b.balance) return -1;
      if (a.balance < b.balance) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み損（額）TOP3
  const dataBalanceAsc = tickerDetail
    .sort(function (a, b) {
      if (a.balance < b.balance) return -1;
      if (a.balance > b.balance) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（率）TOP3
  const dataBalanceRateDesc = tickerDetail
    .sort(function (a, b) {
      if (a.balanceRate > b.balanceRate) return -1;
      if (a.balanceRate < b.balanceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  // 含み益（率）TOP3
  const dataBalanceRateAsc = tickerDetail
    .sort(function (a, b) {
      if (a.balanceRate < b.balanceRate) return -1;
      if (a.balanceRate > b.balanceRate) return 1;
      return 0;
    })
    .slice(0, 3);
  return (
    <div className="ticker-content">
      <div className="content">
        <h2>値上がりTOP3</h2>
        <TickerPanel tickerDetail={dataPriceRateDesc} currency={currency} />
        <div className="clear-both"></div>
        <h2>値下がりTOP3</h2>
        <TickerPanel tickerDetail={dataPriceRateAsc} currency={currency} />
        <div className="clear-both"></div>
        <h2>含み益（額）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceDesc}
          currency={currency}
          displayType="balance"
        />
        <div className="clear-both"></div>
        <h2>含み損（額）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceAsc}
          currency={currency}
          displayType="balance"
        />
        <div className="clear-both"></div>
        <h2>含み益（率）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceRateDesc}
          currency={currency}
          displayType="balanceRate"
        />
        <div className="clear-both"></div>
        <h2>含み損（率）TOP3</h2>
        <TickerPanel
          tickerDetail={dataBalanceRateAsc}
          currency={currency}
          displayType="balanceRate"
        />
        <div className="clear-both"></div>
      </div>
      <div className="content">
        <h2>保有株一覧</h2>
        <input
          type="text"
          className="form-control search-text"
          placeholder="銘柄名、セクターを検索"
          onChange={(e) => search(e.target.value)}
        />
        <TickerPanel tickerDetail={tickerList} currency={currency} />
        <div className="clear-both"></div>
      </div>
    </div>
  );
};
