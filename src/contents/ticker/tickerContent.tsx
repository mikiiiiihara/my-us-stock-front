import React, { useCallback, useState } from "react";
import { Loading } from "../../components/common/loading/loading";
import { HOOKS_STATE } from "../../constants/hooks";
import { SearchTicker } from "./search-ticker/search-ticker";
import { useTickerContext } from "../../contexts/tickersContext";
import { Summary } from "./summary/summary";
import PrimaryButton from "../../components/primary-button/primaryButton";
import { TickerData } from "../../types/tickerData.type";

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};
type Props = {
  tickers: "loading" | TickerData;
};
export const TickerContent: React.FC<Props> = ({ tickers }) => {
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.detail);
  // サマリー画面を表示
  const changeDisplayToSummary = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.summary);
  }, []);
  // 一覧画面を表示
  const changeDisplayToDetail = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.detail);
  }, []);
  // コンテキストから以下を取得
  // (左から順に)画面表示する為替の値、画面表示する為替を切り替える関数、保有株式情報、現在のドル円
  const { fx } = useTickerContext();
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
    <>
      <div className="m-3">
        <PrimaryButton
          content="銘柄別"
          notSelected={displayMode !== DISPLAY_MODE.detail}
          onClick={changeDisplayToDetail}
        />
        <PrimaryButton
          content="サマリー"
          notSelected={displayMode !== DISPLAY_MODE.summary}
          onClick={changeDisplayToSummary}
        />
      </div>
      {displayMode === DISPLAY_MODE.summary ? (
        <Summary tickers={tickerDetailValue} selectedFx={fx} />
      ) : (
        <SearchTicker tickers={tickerDetailValue} selectedFx={fx} />
      )}
    </>
  );
};
