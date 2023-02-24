import React from "react";
import { Center } from "../../components/common/center/center";
import { PortfolioContent } from "./portfolio/portfolioContent";
import { SectorListContent } from "./sector-list/sectorListContent";

export const SectorContent = () => {
  return (
    <Center>
      <PortfolioContent />
      <SectorListContent />
    </Center>
  );
};
