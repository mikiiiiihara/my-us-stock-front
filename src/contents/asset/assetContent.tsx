import { format } from "date-fns";
import React, { useState } from "react";
import { Center } from "../../components/common/center/center";
import { Loading } from "../../components/common/loading/loading";
import { StackedArea } from "../../components/graph/StackedArea";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { HOOKS_STATE } from "../../constants/hooks";
import { themeForest } from "../../constants/themeColor";
import { convertYYYYMMDD } from "../../functions/util/convertYYYYMMDD";
import { useAssets } from "../../hooks/assets/useAssets";
import CashContent from "./cash/cashContent";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { Header } from "../../components/common/header/header";
import { useUser } from "../../hooks/user/userUser";

const DISPLAY_MODE = {
  oneWeek: 7,
  oneMonth: 30,
  threeMonthes: 90,
  all: undefined,
};

export const AssetContent = () => {
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState<number | undefined>(
    DISPLAY_MODE.oneWeek
  );
  // 資産情報取得
  const {
    getAssets,
    changeAssetLength,
    executeUpdateTodayAsset,
    executeCreateTodayAsset,
  } = useAssets();
  const { assets } = getAssets();
  const { getUserName } = useUser();
  // ユーザー名取得
  const userName = getUserName();
  // 画面切り替え用
  const changeDisplay = async (day?: number) => {
    await changeAssetLength(day);
    setDisplayMode(day);
  };
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 現在日時取得
  const year = format(new Date(), "yyyy");
  const month = format(new Date(), "MM");
  const date = format(new Date(), "dd");
  let todayAsset;
  let todayCashUSD = 0;
  let todayCrypto = 0;
  let xDataList: string[] = new Array();
  let yDataList: number[] = new Array();
  if (
    userName === HOOKS_STATE.LOADING ||
    currentUsd === HOOKS_STATE.LOADING ||
    assets === HOOKS_STATE.LOADING
  )
    return <Loading />;
  // 当日の資産情報を更新
  const update = async () => {
    // 当日の資産が登録されているか確認
    const todayAsset = assets.find(
      (asset) =>
        asset.year == year && asset.month == month && asset.date == date
    );
    if (todayAsset == null) {
      // create
      await executeCreateTodayAsset();
    } else {
      // update
      await executeUpdateTodayAsset(
        parseInt(todayAsset.id.toString()),
        todayAsset.cashUSD,
        todayAsset.cashJPY,
        todayAsset.cashBTC,
        todayAsset.cashETH,
        todayAsset.cashRIPPLE,
        todayAsset.cashBAT,
        todayAsset.cashLTC
      );
    }
  };
  if (assets != null) {
    // for cash content
    for (let value of assets) {
      if (value != undefined) {
        // X軸：年月日
        const xData = convertYYYYMMDD(value.year, value.month, value.date);
        // Y軸：総資産
        const yData = value.total;
        xDataList.push(xData);
        yDataList.push(Math.round(yData * 1) / 1);
        if (value.year == year && value.month == month && value.date == date) {
          todayAsset = value;
        }
      }
    }
    if (todayAsset != undefined) {
      todayCashUSD = todayAsset.cashUSD * currentUsd;
      todayCrypto =
        todayAsset.total - todayAsset.asset - todayAsset.cashJPY - todayCashUSD;
    }
  }
  // 前日比の差分
  const priceGap =
    assets.length > 1
      ? assets[assets.length - 1].total - assets[assets.length - 2].total
      : 0;
  // 前日比(%)の計算
  const priceRate = priceGap / assets[assets.length - 2].total;
  const priceRateBalance = priceRate > 0 ? "text-success" : "text-danger";
  const balanceIcon = priceRate > 0 ? "+" : "-";
  return (
    <>
      <Center>
        <Header userName={userName} />
        <div className="content">
          <h1>資産総額推移</h1>
          <p>
            資産総額：¥
            {assets[assets.length - 1].total
              ? Math.round(
                  (assets[assets.length - 1].total * 10) / 10
                ).toLocaleString()
              : ""}
            <p className={priceRateBalance}>
              前日比:{balanceIcon}
              {priceGap.toLocaleString()}({balanceIcon}
              {(Math.round(priceRate * 100) / 100).toLocaleString()}%)
            </p>
          </p>
          <div className="m-3">
            <PrimaryButton
              content="全期間"
              notSelected={displayMode !== DISPLAY_MODE.all}
              onClick={() => changeDisplay(DISPLAY_MODE.all)}
            />
            <PrimaryButton
              content="3ヶ月"
              notSelected={displayMode !== DISPLAY_MODE.threeMonthes}
              onClick={() => changeDisplay(DISPLAY_MODE.threeMonthes)}
            />
            <PrimaryButton
              content="１ヶ月"
              notSelected={displayMode !== DISPLAY_MODE.oneMonth}
              onClick={() => changeDisplay(DISPLAY_MODE.oneMonth)}
            />
            <PrimaryButton
              content="１週間"
              notSelected={displayMode !== DISPLAY_MODE.oneWeek}
              onClick={() => changeDisplay(DISPLAY_MODE.oneWeek)}
            />
          </div>
          <StackedArea
            xData={xDataList}
            yData={yDataList}
            themeColor={themeForest[0]}
            background="#343a40"
          />
          <PrimaryButton
            content="最新状態に更新"
            onClick={update}
            isForContent={true}
          />
        </div>
        <div className="mb-5">
          <CashContent
            cash={todayCashUSD + (todayAsset?.cashJPY || 0)}
            crypto={todayCrypto}
            stock={todayAsset?.asset || 0}
          />
        </div>
      </Center>
    </>
  );
};
