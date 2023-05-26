import { SectorContent } from "../../contents/sector/sectorContent";
import { gql, useQuery } from "@apollo/client";
import { MarketData } from "../../types/marketData.type";
import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";

type Response = {
  getMarketPrices: MarketData[];
};

const GET_SECTORS = gql`
  query GetMarketPrices {
    getMarketPrices(
      tickerList: [
        "SPY"
        "XLE"
        "XLK"
        "SMH"
        "IBB"
        "XLV"
        "XLP"
        "XLU"
        "XLB"
        "XLY"
        "XLF"
        "XLI"
        "XLRE"
        "XME"
        "XRT"
        "ITA"
        "ICLN"
        "AGG"
        "GLD"
        "DBA"
      ]
    ) {
      ticker
      currentPrice
      currentRate
      priceGets
    }
  }
`;

const Sector = () => {
  const { data, loading } = useQuery<Response>(GET_SECTORS);
  if (loading) return <Loading />;
  return (
    <>
      <NextHead title="My US Stock Portfolio | Sector" />
      <SectorContent sectors={data?.getMarketPrices || []} />
    </>
  );
};
export default Sector;
