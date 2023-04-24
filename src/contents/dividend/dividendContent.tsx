import React from "react";
import { DivData } from "../../types/divData.type";
import { PieData } from "../../types/pieData.type";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateDividendCalendar } from "../../functions/dividend/calculateDividendCalendar";
import { Loading } from "../../components/common/loading/loading";
import Pie from "../../components/graph/pie";
import StackedColumn from "../../components/graph/stackedColumn";
import { themeDefault } from "../../constants/themeColor";
import { HOOKS_STATE } from "../../constants/hooks";
import { TickerData } from "../../types/tickerData.type";
import { useTickerContext } from "../../contexts/tickersContext";

type Props = {
  tickers: "loading" | TickerData;
};

export const DividendContent: React.FC<Props> = ({ tickers }) => {
  // コンテキストから取得
  const { fx } = useTickerContext();
  if (tickers === HOOKS_STATE.LOADING) return <Loading />;
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
    <div>
      <div className="content">
        <h2>
          年配当総額: {fx}
          {dividendTotal}
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
