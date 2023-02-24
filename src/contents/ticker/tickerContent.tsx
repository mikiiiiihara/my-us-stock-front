import React from "react";
import Image from "next/image";
import { Loading } from "../../components/common/loading/loading";
import { HOOKS_STATE } from "../../constants/hooks";
import { SearchTicker } from "./search-ticker/search-ticker";
import { useTickerContext } from "../../contexts/tickersContext";
import PrimaryButton from "../../components/primary-button/primaryButton";

export const TickerContent = () => {
  // コンテキストから以下を取得
  // (左から順に)画面表示する為替の値、画面表示する為替を切り替える関数、保有株式情報、現在のドル円
  const { fx, changeFx, getTickers } = useTickerContext();
  // 保有株式総額を取得
  const { tickers } = getTickers(fx);
  if (tickers === HOOKS_STATE.LOADING)
    return (
      <div className="home-content">
        <Loading />
      </div>
    );
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const tickerDetailValue = tickers.tickerDetail.map((ticker) => {
    return ticker;
  });
  tickerDetailValue.sort(function (a, b) {
    if (a.ticker < b.ticker) return -1;
    if (a.ticker > b.ticker) return 1;
    return 0;
  });
  return (
    <div>
      <SearchTicker tickers={tickerDetailValue} selectedFx={fx} />
      <PrimaryButton
        content={
          <>
            <p className="fx-button">{fx == "$" ? "$" : "¥"}表示</p>
            <Image
              src="/fx.png"
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
              alt="logo"
            />
          </>
        }
        onClick={changeFx}
        className="fx-button-fix"
      />
    </div>
  );
};
