import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useState } from "react";
import { Loading } from "../../components/common/loading/loading";
import StackedArea from "../../components/graph/StakedArea";
import { themeElectronic } from "../../constants/themeColor";
import { calculateTickerData } from "../../functions/tickers/calculateTickerData";
import { convertYYYYMMDD } from "../../functions/util/convertYYYYMMDD";
import { GET_ASSETS } from "../../hooks/assets/useGetAsset";
import { UPDATE_ASSET } from "../../hooks/assets/useUpdateAsset";
import { GET_MARKETDATA } from "../../hooks/export/useGetMarketData";
import { GET_USD } from "../../hooks/export/useGetUSDJPY";
import { GET_TICKERS } from "../../hooks/tickers/useGetTickers";
import { Asset } from "../../types/asset.type";
import { MarketData } from "../../types/marketData.type";
import { Ticker } from "../../types/ticker.type";
import { TickerData } from "../../types/tickerData.type";
import CashContent from "./cash/cashContent";

export const AssetContent = () => {
  // ログイン情報
  const { data: session } = useSession();
  // 保有株式情報取得
  const { data: tickersData, loading: tickerLoading } = useQuery(GET_TICKERS, {
    variables: { user: session?.user?.email },
  });
  const tickers: Ticker[] = tickersData?.readAllTickers;
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
  // 保有株式総額を算出
  const tickerDataList: TickerData = calculateTickerData(
    tickers,
    marketData,
    currentUsd
  );
  // 資産情報算出
  const { data: assetsData, loading: assetsLoading } = useQuery(GET_ASSETS, {
    variables: { user: session?.user?.email },
  });
  const assets: Asset[] = assetsData?.readAllAssets;
  // 現在日時取得
  const year = format(new Date(), "yyyy");
  const month = format(new Date(), "MM");
  const date = format(new Date(), "dd");
  let todayAsset;
  let todayCashUSD = 0;
  let xDataList: string[] = new Array();
  let yDataList: number[] = new Array();
  if (assets != undefined) {
    // for cash content
    for (let value of assets) {
      if (value != undefined) {
        const xData = convertYYYYMMDD(value.year, value.month, value.date);
        const yData =
          value.asset + value.cashJPY + value.cashUSD * parseInt(currentUsd);
        xDataList.push(xData);
        yDataList.push(Math.round(yData * 1) / 1);
        if (value.year == year && value.month == month && value.date == date) {
          todayAsset = value;
        }
      }
    }
    if (todayAsset != undefined) {
      todayCashUSD = todayAsset.cashUSD * parseInt(currentUsd);
    }
  }
  // 当日の資産情報を更新
  const [UpdateAsset] = useMutation(UPDATE_ASSET);
  const update = async () => {
    const result = await UpdateAsset({
      variables: {
        user: session?.user?.email,
        asset: tickerDataList.priceTotal,
      },
    });
    if (result) {
      router.reload();
    }
  };
  if (tickerLoading || usdJpyLoading || marketDataLoading || assetsLoading)
    return (
      <div className="asset-content">
        <Loading />
      </div>
    );
  return (
    <div className="asset-content">
      <div className="content">
        <h1>資産総額推移</h1>
        <StackedArea
          xData={xDataList}
          yData={yDataList}
          themeColor={themeElectronic[0]}
          background="#343a40"
        />
        <input
          type="button"
          className="btn menu-button primary-button"
          onClick={update}
          value="最新状態に更新"
        />
      </div>
      <CashContent
        cash={todayCashUSD + (todayAsset?.cashJPY || 0)}
        stock={tickerDataList.priceTotal}
      />
    </div>
  );
};
