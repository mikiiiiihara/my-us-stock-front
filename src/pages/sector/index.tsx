import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";
import { useMarketPricesQuery } from "../../gql/graphql";
import { SectorTemplate } from "../../components/templates/sector/sector";

const Sector = () => {
  const { data, loading } = useMarketPricesQuery();
  if (loading) return <Loading />;
  return (
    <>
      <NextHead title="My US Stock Portfolio | Sector" />
      <SectorTemplate sectors={data?.marketPrices || []} />
    </>
  );
};
export default Sector;
