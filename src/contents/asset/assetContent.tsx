import { format } from "date-fns";
import React, { useState } from "react";
import { Center } from "../../components/common/center/center";
import { Loading } from "../../components/common/loading/loading";
import { StackedArea } from "../../components/graph/StackedArea";
import PrimaryButton from "../../components/primary-button/primaryButton";
import { HOOKS_STATE } from "../../constants/hooks";
import { themeForest } from "../../constants/themeColor";
import { convertYYYYMMDD } from "../../functions/util/convertYYYYMMDD";
import { useAssets } from "../../hooks/assets/useAssets";
import CashContent from "./cash/cashContent";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";

const DISPLAY_MODE = {
  oneWeek: 7,
  oneMonth: 30,
  threeMonthes: 90,
};

export const AssetContent = () => {
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.oneWeek);
  // 資産情報取得
  const {
    getAssets,
    changeAssetLength,
    executeUpdateTodayAsset,
    executeCreateTodayAsset,
  } = useAssets();
  const { assets } = getAssets();
  // 画面切り替え用
  const changeDisplay = async (day: number) => {
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
  if (currentUsd === HOOKS_STATE.LOADING || assets === HOOKS_STATE.LOADING)
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
  return (
    <>
      <Center>
        <div className="content">
          <h1>資産総額推移</h1>
          <div className="m-3">
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
