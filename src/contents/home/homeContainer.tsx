import React from "react";
import { FxChangeButton } from "../../components/fx-change-button/fxChangeButton";
import { useTickerContext } from "../../contexts/tickersContext";
import { useGetUSDJPY } from "../../hooks/export/useGetUSDJPY";
import { useTickers } from "../../hooks/tickers/useTickers";
import { DividendContent } from "../dividend/dividendContent";
import { HomeContent } from "./homeContent";
import { StrategyContent } from "./strategy/strategyContent";

const HomeContainerComponent = () => {
  // コンテキストから取得
  const { fx, changeFx } = useTickerContext();
  const {
    getTickers,
    executeCreateTicker,
    executeUpdateTicker,
    executeDeleteTicker,
  } = useTickers();
  // 為替情報取得
  const { currentUsd } = useGetUSDJPY();
  // 保有株式総額を取得
  const { tickers } = getTickers(fx);
  return (
    <>
      <HomeContent
        tickers={tickers}
        currentUsd={currentUsd}
        executeUpdateTicker={executeUpdateTicker}
        executeDeleteTicker={executeDeleteTicker}
        executeCreateTicker={executeCreateTicker}
      />
      <StrategyContent />
      <DividendContent tickers={tickers} />
      <FxChangeButton currency={fx == "$" ? "$" : "¥"} onClick={changeFx} />
    </>
  );
};
HomeContainerComponent.displayName = "HomeContainer";
export const HomeContainer = React.memo(HomeContainerComponent);
