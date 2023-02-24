import React from "react";
import { Loading } from "../../../components/common/loading/loading";
import SectorPanel from "../../../components/sector/sectorPanel";
import { DISPLAY_SECTOR_LIST } from "../../../constants/displaySectorList";
import { HOOKS_STATE } from "../../../constants/hooks";
import { getTickerRealData } from "../../../functions/export/getTickerRealData";
import { useGetMarketData } from "../../../hooks/export/useGetMarketData";

export const SectorListContent = () => {
  const allSectorList = DISPLAY_SECTOR_LIST;
  const { marketData } = useGetMarketData(allSectorList);
  if (marketData === HOOKS_STATE.LOADING)
    return (
      <>
        <div className="content">
          <h4 className="sector-title">セクター別当落率（降順）</h4>
          <Loading />
        </div>
      </>
    );
  const allSectorData = getTickerRealData(allSectorList, marketData);
  return (
    <div className="content">
      <h4 className="sector-title">セクター別当落率（降順）</h4>
      <SectorPanel sectorList={allSectorData} />
    </div>
  );
};
