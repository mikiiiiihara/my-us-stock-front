import React, { FC, useCallback, useMemo, useState } from "react";
import { Pie } from "../../../components/graph/pie";
import { themeDefault } from "../../../constants/themeColor";
import { PrimaryButton } from "../../../components/primary-button/primaryButton";
import { PieData } from "../../../types/pieData.type";
import { calculateSectors } from "../../../functions/sector/calculateSectors";
import { calculateTickerPie } from "../../../functions/tickers/calculateTickerPie";
import { UsStockDetail } from "../../../components/templates/assets/types";

const DISPLAY_MODE = {
  ticker: "ticker",
  sector: "sector",
};

type Props = {
  usStockDetail: UsStockDetail[];
};

const SummaryContentComponent: FC<Props> = ({ usStockDetail }) => {
  // 画面表示
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.ticker);
  const changeDisplayToTicker = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.ticker);
  }, []);

  const changeDisplayToSector = useCallback(() => {
    setDisplayMode(DISPLAY_MODE.sector);
  }, []);

  const pieData = useMemo(
    () => calculateTickerPie(usStockDetail),
    [usStockDetail]
  );

  const sectorData: PieData[] = useMemo(
    () => calculateSectors(usStockDetail),
    [usStockDetail]
  );
  return (
    <>
      <div className="m-3">
        <PrimaryButton
          content="銘柄別"
          notSelected={displayMode !== DISPLAY_MODE.ticker}
          onClick={changeDisplayToTicker}
        />
        <PrimaryButton
          content="セクター別"
          notSelected={displayMode !== DISPLAY_MODE.sector}
          onClick={changeDisplayToSector}
        />
      </div>
      <Pie
        pieData={displayMode === DISPLAY_MODE.ticker ? pieData : sectorData}
        themeColor={themeDefault}
        background="#343a40"
      />
    </>
  );
};

SummaryContentComponent.displayName = "SummaryContent";
export const SummaryContent = React.memo(SummaryContentComponent);
