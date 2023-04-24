import React, { FC, useState } from "react";
import Pie from "../../../components/graph/pie";
import { themeDefault } from "../../../constants/themeColor";
import PrimaryButton from "../../../components/primary-button/primaryButton";
import { PieData } from "../../../types/pieData.type";
import { calculateSectors } from "../../../functions/sector/calculateSector";
import { calculateTickerPie } from "../../../functions/tickers/calculateTickerPie";
import { TickerDetail } from "../../../types/tickerDetail.type";

const DISPLAY_MODE = {
  ticker: "ticker",
  sector: "sector",
};

type Props = {
  tickerDetail: TickerDetail[];
};

export const SummaryContent: FC<Props> = ({ tickerDetail }) => {
  // 画面表示
  //表示切り替え用
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE.ticker);
  // 銘柄別を表示
  const changeDisplayToTicker = () => {
    setDisplayMode(DISPLAY_MODE.ticker);
  };
  // セクター別を表示
  const changeDisplayToSector = () => {
    setDisplayMode(DISPLAY_MODE.sector);
  };
  const pieData = calculateTickerPie(tickerDetail);
  // セクターデータ計算
  const sectorData: PieData[] = calculateSectors(tickerDetail);
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
      {displayMode === DISPLAY_MODE.ticker ? (
        <Pie pieData={pieData} themeColor={themeDefault} background="#343a40" />
      ) : (
        <Pie
          pieData={sectorData}
          themeColor={themeDefault}
          background="#343a40"
        />
      )}
    </>
  );
};
