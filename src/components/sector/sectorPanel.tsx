import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SectorPanelItem } from "./sectorPanelItem";
import { TickerRealData } from "../../types/tickerRealData.type";

type Props = {
  sectorList: TickerRealData[];
};
const SectorPanelComponent: React.FC<Props> = ({ sectorList }) => {
  return (
    <div>
      {sectorList.map((sector) => (
        <div key={sector.ticker}>
          <SectorPanelItem data={sector} />
        </div>
      ))}
      <div className="clear-both"></div>
    </div>
  );
};

SectorPanelComponent.displayName = "SectorPanel";
export const SectorPanel = React.memo(SectorPanelComponent);
