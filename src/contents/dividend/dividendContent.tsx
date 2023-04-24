import React from "react";
import { DivData } from "../../types/divData.type";
import { PieData } from "../../types/pieData.type";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateDividendCalendar } from "../../functions/dividend/calculateDividendCalendar";
import { Loading } from "../../components/common/loading/loading";
import { StackedColumn } from "../../components/graph/stackedColumn";
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
      </div>
    </div>
  );
};
