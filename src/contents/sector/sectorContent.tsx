import React, { FC } from "react";
import { Center } from "../../components/common/center/center";
import { PortfolioContent } from "./portfolio/portfolioContent";
import { SectorListContent } from "./sector-list/sectorListContent";
import { MarketData } from "../../types/marketData.type";

type Props = {
  sectors: MarketData[];
};

export const SectorContent: FC<Props> = ({ sectors }) => {
  return (
    <Center>
      <PortfolioContent />
      <SectorListContent sectors={sectors} />
    </Center>
  );
};
