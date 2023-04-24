import React, { FC } from "react";
import SectorPanel from "../../../components/sector/sectorPanel";
import { DISPLAY_SECTOR_LIST } from "../../../constants/displaySectorList";
import { getTickerRealData } from "../../../functions/export/getTickerRealData";
import { MarketData } from "../../../types/marketData.type";

type Props = {
  sectors: MarketData[];
};

export const SectorListContent: FC<Props> = ({ sectors }) => {
  const allSectorList = DISPLAY_SECTOR_LIST;
  const allSectorData = getTickerRealData(allSectorList, sectors);
  return (
    <div className="content">
      <h4 className="sector-title">セクター別当落率（降順）</h4>
      <SectorPanel sectorList={allSectorData} />
    </div>
  );
};
