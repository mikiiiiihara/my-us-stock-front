import { format } from "date-fns";
import React from "react";
import { Loading } from "../../components/common/loading/loading";
import StackedArea from "../../components/graph/StakedArea";
import PrimaryButton from "../../components/primary-button/primaryButton";
import { HOOKS_STATE } from "../../constants/hooks";
import { themeElectronic } from "../../constants/themeColor";
import { useTickerContext } from "../../contexts/tickersContext";
import { convertYYYYMMDD } from "../../functions/util/convertYYYYMMDD";
import { useAssets } from "../../hooks/assets/useAssets";
import CashContent from "./cash/cashContent";

export const AssetContent = () => {
  // コンテキストから取得
  const { getTickers, currentUsd } = useTickerContext();
  // 保有株式総額を円建てで取得
  const { tickers } = getTickers("¥");
  // 現在日時取得
  const year = format(new Date(), "yyyy");
  const month = format(new Date(), "MM");
  const date = format(new Date(), "dd");
  let todayAsset;
  let todayCashUSD = 0;
  let xDataList: string[] = new Array();
  let yDataList: number[] = new Array();
  // 資産情報取得
  const { getAssets, executeUpdateTodayAsset, executeCreateTodayAsset } =
    useAssets();
  const { assets } = getAssets();
  if (
    tickers === HOOKS_STATE.LOADING ||
    currentUsd === HOOKS_STATE.LOADING ||
    assets === HOOKS_STATE.LOADING
  )
    return (
      <div className="asset-content">
        <Loading />
      </div>
    );
  // 当日の資産情報を更新
  const update = async () => {
    // 当日の資産が登録されているか確認
    const todayAsset = assets.find(
      (asset) =>
        asset.year == year && asset.month == month && asset.date == date
    );
    if (todayAsset == null) {
      // create
      await executeCreateTodayAsset(tickers.priceTotal);
    } else {
      // update
      await executeUpdateTodayAsset(
        parseInt(todayAsset.id.toString()),
        tickers.priceTotal
      );
    }
  };
  if (assets != null) {
    // for cash content
    for (let value of assets) {
      if (value != undefined) {
        const xData = convertYYYYMMDD(value.year, value.month, value.date);
        const yData = value.asset + value.cashJPY + value.cashUSD * currentUsd;
        xDataList.push(xData);
        yDataList.push(Math.round(yData * 1) / 1);
        if (value.year == year && value.month == month && value.date == date) {
          todayAsset = value;
        }
      }
    }
    if (todayAsset != undefined) {
      todayCashUSD = todayAsset.cashUSD * currentUsd;
    }
  }
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
        <PrimaryButton
          content="最新状態に更新"
          onClick={update}
          isForContent={true}
        />
      </div>
      <CashContent
        cash={todayCashUSD + (todayAsset?.cashJPY || 0)}
        stock={tickers.priceTotal}
      />
    </div>
  );
};
