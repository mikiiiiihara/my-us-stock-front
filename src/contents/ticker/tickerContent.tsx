import React, { useState } from "react";
import { Loading } from "../../components/common/loading/loading";
import { HOOKS_STATE } from "../../constants/hooks";
import { SearchTicker } from "./search-ticker/search-ticker";
import { useTickerContext } from "../../contexts/tickersContext";
import { FxChangeButton } from "../../components/fx-change-button/fxChangeButton";
import { Summary } from "./summary/summary";
import PrimaryButton from "../../components/primary-button/primaryButton";

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};
export const TickerContent = () => {
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.summary);
  // サマリー画面を表示
  const changeDisplayToSummary = () => {
    setDisplayMode(DISPLAY_MODE.summary);
  };
  // 一覧画面を表示
  const changeDisplayToDetail = () => {
    setDisplayMode(DISPLAY_MODE.detail);
  };
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
    <div className="content">
      <div className="mb-3 d-lg-flex">
        <h2 className="m-3 mr-auto">保有株一覧</h2>
        <div className="m-3">
          <PrimaryButton
            content="サマリー"
            notSelected={displayMode !== DISPLAY_MODE.summary}
            onClick={changeDisplayToSummary}
          />
          <PrimaryButton
            content="一覧"
            notSelected={displayMode !== DISPLAY_MODE.detail}
            onClick={changeDisplayToDetail}
          />
        </div>
      </div>
      {displayMode === DISPLAY_MODE.summary ? (
        <Summary tickers={tickerDetailValue} selectedFx={fx} />
      ) : (
        <SearchTicker tickers={tickerDetailValue} selectedFx={fx} />
      )}
      <FxChangeButton currency={fx == "$" ? "$" : "¥"} onClick={changeFx} />
    </div>
  );
};
