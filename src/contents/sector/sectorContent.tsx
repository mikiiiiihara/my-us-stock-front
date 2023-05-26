import React, { FC } from "react";
import { Center } from "../../components/common/center/center";
import { MarketData } from "../../types/marketData.type";
import { SectorPanel } from "../../components/sector/sectorPanel";
import { getTickerRealData } from "../../functions/export/getTickerRealData";
import { Header } from "../../components/common/header/header";

type Props = {
  sectors: MarketData[];
};

export const SectorContent: FC<Props> = ({ sectors }) => {
  const allSectorData = getTickerRealData(sectors);
  return (
    <Center>
      <Header />
      <div className="content">
        <h4 className="sector-title">セクター別当落率（降順）</h4>
        <SectorPanel sectorList={allSectorData} />
      </div>
    </Center>
  );
};
