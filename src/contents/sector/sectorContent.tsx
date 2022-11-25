import React from "react";
import { PortfolioContent } from "./portfolio/portfolioContent";
import { SectorListContent } from "./sector-list/sectorListContent";

export const SectorContent = () => {
  return (
    <div className="sector-content">
      <PortfolioContent />
      <SectorListContent />
    </div>
  );
};
