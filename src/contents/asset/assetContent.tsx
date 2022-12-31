import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import router from "next/router";
import React from "react";
import { Loading } from "../../components/common/loading/loading";
import StackedArea from "../../components/graph/StakedArea";
import { HOOKS_STATE } from "../../constants/hooks";
import { themeElectronic } from "../../constants/themeColor";
import { convertYYYYMMDD } from "../../functions/util/convertYYYYMMDD";
import { useAssets } from "../../hooks/assets/useAssets";
import { UPDATE_ASSET } from "../../hooks/assets/useUpdateAsset";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { useGetTickers } from "../../hooks/tickers/useGetTickers";
import CashContent from "./cash/cashContent";

export const AssetContent = () => {
  // 保有株式情報取得
  const { tickers } = useGetTickers("¥");
  // ログイン情報
  const { data: session } = useSession();
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 現在日時取得
  const year = format(new Date(), "yyyy");
  const month = format(new Date(), "MM");
  const date = format(new Date(), "dd");
  let todayAsset;
  let todayCashUSD = 0;
  let xDataList: string[] = new Array();
  let yDataList: number[] = new Array();
  // 資産情報取得
  const { assets } = useAssets();
  // 当日の資産情報を更新
  const [UpdateAsset] = useMutation(UPDATE_ASSET);
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
  const update = async () => {
    const result = await UpdateAsset({
      variables: {
        user: session?.user?.email,
        asset: tickers.priceTotal,
      },
    });
    if (result) {
      router.reload();
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
        <input
          type="button"
          className="btn menu-button primary-button"
          onClick={update}
          value="最新状態に更新"
        />
      </div>
      <CashContent
        cash={todayCashUSD + (todayAsset?.cashJPY || 0)}
        stock={tickers.priceTotal}
      />
    </div>
  );
};
