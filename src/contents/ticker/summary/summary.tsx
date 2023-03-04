import React, { useEffect, useState } from "react";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { TickerDetail } from "../../../types/tickerDetail.type";

type Props = {
  tickers: TickerDetail[];
  selectedFx: string;
};
export const Summary: React.FC<Props> = ({ tickers, selectedFx }) => {
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
      <h3 className="ml-3">値上がりTOP3</h3>
      <TickerPanel tickerDetail={dataPriceRateDesc} currency={selectedFx} />
      <div className="clear-both"></div>
      <h3 className="ml-3">値下がりTOP3</h3>
      <TickerPanel tickerDetail={dataPriceRateAsc} currency={selectedFx} />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み益（額）TOP3</h3>
      <TickerPanel
        tickerDetail={dataBalanceDesc}
        currency={selectedFx}
        displayType="balance"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み損（額）TOP3</h3>
      <TickerPanel
        tickerDetail={dataBalanceAsc}
        currency={selectedFx}
        displayType="balance"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み益（率）TOP3</h3>
      <TickerPanel
        tickerDetail={dataBalanceRateDesc}
        currency={selectedFx}
        displayType="balanceRate"
      />
      <div className="clear-both"></div>
      <h3 className="ml-3">含み損（率）TOP3</h3>
      <TickerPanel
        tickerDetail={dataBalanceRateAsc}
        currency={selectedFx}
        displayType="balanceRate"
      />
      <div className="clear-both"></div>
    </>
  );
};
