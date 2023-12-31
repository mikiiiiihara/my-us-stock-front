import { SectorContent } from "../../contents/sector/sectorContent";
import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";
import { useMarketPricesQuery } from "../../gql/graphql";

const Sector = () => {
  const { data, loading } = useMarketPricesQuery();
  if (loading) return <Loading />;
  return (
    <>
      <NextHead title="My US Stock Portfolio | Signin" />
      <SectorContent sectors={data?.marketPrices || []} />
    </>
  );
};
export default Sector;
