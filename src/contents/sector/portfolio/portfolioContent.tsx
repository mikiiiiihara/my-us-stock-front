import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";
import { Loading } from "../../../components/common/loading/loading";
import Pie from "../../../components/graph/pie";
import { themeDefault } from "../../../constants/themeColor";
import { calculateSectors } from "../../../functions/sector/calculateSector";
import { calculateTickerData } from "../../../functions/tickers/calculateTickerData";
import { GET_MARKETDATA } from "../../../hooks/export/useGetMarketData";
import { GET_USD } from "../../../hooks/export/useGetUSDJPY";
import { GET_TICKERS } from "../../../hooks/tickers/useGetTickers";
import { MarketData } from "../../../types/marketData.type";
import { PieData } from "../../../types/pieData.type";
import { Ticker } from "../../../types/ticker.type";
import { TickerData } from "../../../types/tickerData.type";
import { TickerDetail } from "../../../types/tickerDetail.type";

export const PortfolioContent = () => {
  // ログイン情報
  const { data: session } = useSession();
  // 為替情報取得
  const { data: usdJpyData, loading: usdJpyLoading } = useQuery(GET_USD);
  const currentUsd = usdJpyData?.readUsd;
  // 保有株式情報取得
  const { data: tickersData, loading: tickersLoading } = useQuery(GET_TICKERS, {
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
    { variables: { tickerList } }
  );
  const realtimeData: MarketData[] = priceData?.getRealtimeData;
  // 資産総額取得
  const tickerData: TickerData = calculateTickerData(tickers, realtimeData, 1);
  const tickerDetail: TickerDetail[] = tickerData.tickerDetail;
  const priceTotal = tickerData.priceTotal;
  const balanceTotal =
    Math.round((tickerData.priceTotal - tickerData.getPriceTotal) * 10) / 10;
  const balanceRateTotal =
    (Math.round((balanceTotal / tickerData.getPriceTotal) * 100) / 100) * 100;
  const dividendTotal = tickerData.dividendTotal;
  let balanceRateClass = "";
  if (balanceRateTotal > 0) {
    balanceRateClass = "fc-plus";
  } else if (balanceRateTotal < 0) {
    balanceRateClass = "fc-minus";
  }
  // セクターデータ計算
  const pieData: PieData[] = calculateSectors(tickerDetail, priceTotal);
  if (usdJpyLoading || tickersLoading || marketDataLoading)
    return (
      <>
        <h1 className="sector-title">資産総額: ${priceTotal}</h1>
        <div className="sector-content">
          <Loading />
        </div>
      </>
    );
  return (
    <div className="sector-content">
      <div className="content">
        <h1>資産総額: ${priceTotal}</h1>
        <p className={balanceRateClass}>
          損益: ${balanceTotal}（{Math.round(balanceRateTotal * 100) / 100}%）
        </p>
        <p className="">
          円換算: ¥{(priceTotal * parseInt(currentUsd)).toLocaleString()}
        </p>
        <p>
          年配当金総額： ${dividendTotal} （¥
          {(dividendTotal * parseInt(currentUsd)).toLocaleString()}）
        </p>
        <p>（USDJPY: {currentUsd}）</p>
        <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
      </div>
    </div>
  );
};
