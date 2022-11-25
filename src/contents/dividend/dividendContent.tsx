import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { GET_MARKETDATA } from "../../hooks/export/useGetMarketData";
import { GET_USD } from "../../hooks/export/useGetUSDJPY";
import { GET_TICKERS } from "../../hooks/tickers/useGetTickers";
import { DivData } from "../../types/divData.type";
import { MarketData } from "../../types/marketData.type";
import { PieData } from "../../types/pieData.type";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateDividendCalendar } from "../../functions/dividend/calculateDividendCalendar";
import { Loading } from "../../components/common/loading/loading";
import Pie from "../../components/graph/pie";
import StackedColumn from "../../components/graph/stackedColumn";
import { themeDefault } from "../../constants/themeColor";

export const DividendContent = () => {
  const { data: session } = useSession();
  // 為替情報取得
  const { data: usdJpyData, loading: usdJpyLoading } = useQuery(GET_USD);
  const currentUsd = usdJpyData?.readUsd;
  // 保有株式情報取得
  const { data: tickersData, loading: tickerLoading } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email },
  });
  const tickers: Ticker[] = tickersData?.readAllTickers;
  //保有株式の現在価格を取得
  const tickerList: string[] = [];
  tickers?.forEach((ticker) => {
    tickerList.push(ticker.ticker);
  });
  const { data: priceData, loading: marketDataLoading } = useQuery(
    GET_MARKETDATA,
    {
      variables: { tickerList },
    }
  );
  const marketData: MarketData[] = priceData?.getRealtimeData;
  // 保有株式総額を算出
  const tickerData: TickerData = calculateTickerData(tickers, marketData, 1);
  const tickerDetail: TickerDetail[] = tickerData.tickerDetail;
  const dividendTotal = tickerData.dividendTotal;
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
  if (tickerLoading || usdJpyLoading || marketDataLoading)
    return (
      <div className="dividend-content">
        <Loading />
      </div>
    );
  return (
    <div className="dividend-content">
      <div className="content">
        <h2>
          年配当総額: ${dividendTotal}（¥
          {(dividendTotal * parseInt(currentUsd)).toLocaleString()}）
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
