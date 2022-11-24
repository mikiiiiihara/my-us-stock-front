import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_USD } from "../../hooks/export/useGetUSDJPY";
import { Loading } from "../../components/common/loading/loading";
import { Ticker } from "../../types/ticker.type";
import { GET_TICKERS } from "../../hooks/tickers/useGetTickers";
import { GET_MARKETDATA } from "../../hooks/export/useGetMarketData";
import { MarketData } from "../../types/marketData.type";
import { TickerData } from "../../types/tickerData.type";
import { calculateTickerData } from "../../functions/calculateTickerData";
import { TickerDetail } from "../../types/tickerDetail.type";
import { calculateTickerPie } from "../../functions/calculateTickerPie";
import { themeDefault } from "../../constants/themeColor";
import Pie from "../../components/graph/pie";
import { StrategyContent } from "./strategy/strategyContent";
import Image from "next/image";
import { TickerContent } from "./ticker/tickerContent";
import UpdateModal from "./modal/updateModal";
import CreateModal from "./modal/createModal";

export const HomeContent = () => {
  // ログイン情報
  const { data: session } = useSession();
  // 画面表示
  const [showUpdModal, setUpdModal] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const ShowUpdModal = () => {
    setUpdModal(true);
  };
  const ShowAddModal = () => {
    setAddModal(true);
  };
  const [fx, setFx] = useState("$");
  const changeFx = () => {
    if (fx == "$") {
      setFx("¥");
    } else if (fx == "¥") {
      setFx("$");
    }
  };
  // 保有株式情報取得
  const { data: tickerData, loading: tickerLoading } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email },
  });
  const tickers: Ticker[] = tickerData?.readAllTickers;
  // 為替情報取得
  const { data: usdJpyData, loading: usdJpyLoading } = useQuery(GET_USD);
  const currentUsd = usdJpyData?.readUsd;
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
  const fxValue = fx == "$" ? 1 : currentUsd;
  const portfolioData: TickerData = calculateTickerData(
    tickers,
    marketData,
    fxValue
  );
  const tickerDetail: TickerDetail[] = portfolioData.tickerDetail;
  const priceTotal = portfolioData.priceTotal;
  const balanceTotal =
    Math.round((portfolioData.priceTotal - portfolioData.getPriceTotal) * 10) /
    10;
  const balanceRateTotal =
    (Math.round((balanceTotal / portfolioData.getPriceTotal) * 100) / 100) *
    100;
  const dividendTotal = portfolioData.dividendTotal;
  const pieData = calculateTickerPie(tickerDetail, priceTotal);
  let balanceRateClass = "";
  if (balanceRateTotal > 0) {
    balanceRateClass = "fc-plus";
  } else if (balanceRateTotal < 0) {
    balanceRateClass = "fc-minus";
  }
  if (usdJpyLoading || tickerLoading || marketDataLoading)
    return (
      <div className="home-content">
        <Loading />
      </div>
    );
  return (
    <div className="home-content">
      <div className="content">
        <h1>
          保有株式総額: {fx}
          {priceTotal.toLocaleString()}
        </h1>
        <p className={balanceRateClass}>
          損益: {fx}
          {balanceTotal.toLocaleString()}（{balanceRateTotal.toLocaleString()}
          %）
        </p>
        <p>
          年配当金総額： {fx}
          {dividendTotal.toLocaleString()}
        </p>
        <p>（USDJPY: {currentUsd}）</p>
        <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
        <div className="menu-btn-content">
          <input
            type="button"
            value="情報を変更"
            onClick={ShowUpdModal}
            className="btn menu-button primary-button"
          />
          <input
            type="button"
            value="銘柄を追加"
            onClick={ShowAddModal}
            className="btn menu-button primary-button"
          />
        </div>
        <UpdateModal
          showFlag={showUpdModal}
          setShowModal={setUpdModal}
          tickers={tickers}
        />
        <CreateModal showFlag={showAddModal} setShowModal={setAddModal} />
      </div>
      <StrategyContent />
      <button onClick={changeFx} className="primary-button fx-button-fix">
        <p className="fx-button">{fx == "$" ? "$" : "¥"}表示</p>
        <Image
          src="/fx.png"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
          alt="logo"
        />
      </button>
      <TickerContent tickerDetail={tickerDetail} currency={fx} />
    </div>
  );
};
