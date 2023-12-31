import React, { useCallback, useState } from "react";
import { SearchTicker } from "./search-ticker/search-ticker";
import { useTickerContext } from "../../contexts/tickersContext";
import { Summary } from "./summary/summary";
import { PrimaryButton } from "../../components/primary-button/primaryButton";
import { UsStockSummary } from "../../components/templates/assets/types";

const DISPLAY_MODE = {
  summary: "summary",
  detail: "detail",
};
type Props = {
  usStockSummary: UsStockSummary;
};
const TickeContentComponent: React.FC<Props> = ({ usStockSummary }) => {
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
  // 一覧表示用の配列をTickerでアルファベット順にソート
  const usStockDetails = [...usStockSummary.usStockDetails].sort((a, b) =>
    a.code.localeCompare(b.code)
  );

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
        <Summary usStockDetails={usStockDetails} selectedFx={fx} />
      ) : (
        <SearchTicker usStockDetails={usStockDetails} selectedFx={fx} />
      )}
    </>
  );
};
TickeContentComponent.displayName = "TickerContent";
export const TickerContent = React.memo(TickeContentComponent);
