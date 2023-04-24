import React from "react";
import { TickerPanel } from "../../../components/tickers/tickerPanel";
import { TickerDetail } from "../../../types/tickerDetail.type";
import { useTickersSummary } from "../../../hooks/useTickersSummary.ts/useTickersSummary";

type Props = {
  tickers: TickerDetail[];
  selectedFx: string;
};
const SummaryComponent: React.FC<Props> = ({ tickers, selectedFx }) => {
  // 値上がりTOP3
  const dataPriceRateDesc = useTickersSummary(
    tickers,
    (a, b) => b.priceRate - a.priceRate,
    3
  );
  // 値下がりTOP3
  const dataPriceRateAsc = useTickersSummary(
    tickers,
    (a, b) => a.priceRate - b.priceRate,
    3
  );
  // 含み益（額）TOP3
  const dataBalanceDesc = useTickersSummary(
    tickers,
    (a, b) => b.balance - a.balance,
    3
  );
  // 含み損（額）TOP3
  const dataBalanceAsc = useTickersSummary(
    tickers,
    (a, b) => a.balance - b.balance,
    3
  );
  // 含み益（率）TOP3
  const dataBalanceRateDesc = useTickersSummary(
    tickers,
    (a, b) => b.balanceRate - a.balanceRate,
    3
  );
  // 含み益（率）TOP3
  const dataBalanceRateAsc = useTickersSummary(
    tickers,
    (a, b) => a.balanceRate - b.balanceRate,
    3
  );
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
SummaryComponent.displayName = "Summary";
export const Summary = React.memo(SummaryComponent);
