import React from "react";
import { Loading } from "../../../components/common/loading/loading";
import Pie from "../../../components/graph/pie";
import { HOOKS_STATE } from "../../../constants/hooks";
import { themeDefault } from "../../../constants/themeColor";
import { useTickerContext } from "../../../contexts/tickersContext";
import { calculateSectors } from "../../../functions/sector/calculateSector";
import { PieData } from "../../../types/pieData.type";
import { TickerDetail } from "../../../types/tickerDetail.type";

export const PortfolioContent = () => {
  // コンテキストから取得
  const { getTickers, currentUsd } = useTickerContext();
  // 保有株式総額をドル建てで取得
  const { tickers } = getTickers("$");
  if (tickers === HOOKS_STATE.LOADING || currentUsd === HOOKS_STATE.LOADING)
    return <Loading />;
  const tickerDetail: TickerDetail[] = tickers.tickerDetail;
  const priceTotal = tickers.priceTotal;
  const balanceTotal =
    Math.round((tickers.priceTotal - tickers.getPriceTotal) * 10) / 10;
  const balanceRateTotal =
    (Math.round((balanceTotal / tickers.getPriceTotal) * 1000) / 1000) * 100;
  const dividendTotal = tickers.dividendTotal;
  let balanceRateClass = "";
  if (balanceRateTotal > 0) {
    balanceRateClass = "fc-plus";
  } else if (balanceRateTotal < 0) {
    balanceRateClass = "fc-minus";
  }
  // セクターデータ計算
  const pieData: PieData[] = calculateSectors(tickerDetail, priceTotal);
  return (
    <div className="content">
      <h1>資産総額: ${priceTotal}</h1>
      <p className={balanceRateClass}>
        損益: ${balanceTotal}（{Math.round(balanceRateTotal * 100) / 100}%）
      </p>
      <p className="">円換算: ¥{(priceTotal * currentUsd).toLocaleString()}</p>
      <p>
        年配当金総額： ${dividendTotal} （¥
        {(dividendTotal * currentUsd).toLocaleString()}）
      </p>
      <p>（USDJPY: {currentUsd}）</p>
      <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
    </div>
  );
};
