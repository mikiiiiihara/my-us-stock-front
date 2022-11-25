import { useQuery } from "@apollo/client";
import React from "react";
import { Loading } from "../../../components/common/loading/loading";
import SectorPanel from "../../../components/sector/sectorPanel";
import { getTickerRealData } from "../../../functions/export/getTickerRealData";
import { GET_MARKETDATA } from "../../../hooks/export/useGetMarketData";
import { MarketData } from "../../../types/marketData.type";

export const SectorListContent = () => {
  const allSectorList = [
    "SPY",
    "XLE",
    "XLK",
    "SMH",
    "IBB",
    "XLV",
    "XLP",
    "XLU",
    "XLB",
    "XLY",
    "XLF",
    "XLI",
    "XLRE",
    "XME",
    "XRT",
    "ITA",
    "ICLN",
    "AGG",
    "GLD",
    "DBA",
  ];
  const { data, loading } = useQuery(GET_MARKETDATA, {
    variables: { tickerList: allSectorList },
  });
  const realSectorData: MarketData[] = data?.getRealtimeData;
  const allSectorData = getTickerRealData(allSectorList, realSectorData);
  if (loading)
    return (
      <>
        <div className="sector-content">
          <h4 className="sector-title">セクター別当落率（降順）</h4>
          <Loading />
        </div>
      </>
    );
  return (
    <div className="sector-list-content">
      <div className="content">
        <h4 className="sector-title">セクター別当落率（降順）</h4>
        <SectorPanel sectorList={allSectorData} />
      </div>
    </div>
  );
};
