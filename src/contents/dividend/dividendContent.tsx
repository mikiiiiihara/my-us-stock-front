import React from "react";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { useGetTickers } from "../../hooks/tickers/useGetTickers";
import { DivData } from "../../types/divData.type";
import { PieData } from "../../types/pieData.type";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateDividendCalendar } from "../../functions/dividend/calculateDividendCalendar";
import { Loading } from "../../components/common/loading/loading";
import Pie from "../../components/graph/pie";
import StackedColumn from "../../components/graph/stackedColumn";
import { themeDefault } from "../../constants/themeColor";
import { HOOKS_STATE } from "../../constants/hooks";

export const DividendContent = () => {
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式情報取得
  const { tickers } = useGetTickers("$");
  if (tickers === HOOKS_STATE.LOADING || currentUsd === HOOKS_STATE.LOADING)
    return (
      <div className="dividend-content">
        <Loading />
      </div>
    );
  const tickerDetail: TickerDetail[] = tickers.tickerDetail;
  const dividendTotal = tickers.dividendTotal;
  const divData: DivData[] = calculateDividendCalendar(tickerDetail);
  const pieDataList = tickerDetail
    .sort(function (a, b) {
      if (a.sumOfDividend > b.sumOfDividend) return -1;
      if (a.sumOfDividend < b.sumOfDividend) return 1;
      return 0;
    })
    .map((data) => {
      const pie: PieData = { name: data.ticker, y: data.sumOfDividend };
      return pie;
    });
  return (
    <div className="dividend-content">
      <div className="content">
        <h2>
          年配当総額: ${dividendTotal}（¥
          {(dividendTotal * currentUsd).toLocaleString()}）
        </h2>
        <StackedColumn
          divData={divData}
          themeColor={themeDefault}
          background="#343a40"
        />
        <h2>銘柄別割合</h2>
        <Pie
          pieData={pieDataList}
          themeColor={themeDefault}
          background="#343a40"
        />
      </div>
    </div>
  );
};
