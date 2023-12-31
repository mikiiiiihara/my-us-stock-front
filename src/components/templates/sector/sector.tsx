import React, { FC } from "react";
import { Center } from "../../common/center/center";
import { MarketData } from "../../../types/marketData.type";
import { SectorPanel } from "../../sector/sectorPanel";
import { Header } from "../../common/header/header";
import { calculateSectors } from "./calculate-sector";

type Props = {
  sectors: MarketData[];
};

export const SectorTemplate: FC<Props> = ({ sectors }) => {
  const allSectorData = calculateSectors(sectors);
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
