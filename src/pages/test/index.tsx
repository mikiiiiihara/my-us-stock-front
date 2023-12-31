import { NextHead } from "../../components/common/next-head/nextHead";
import { Loading } from "../../components/common/loading/loading";
import { useUsStocksQuery } from "../../gql/graphql";

const Test = () => {
  const { data, loading } = useUsStocksQuery();
  if (loading) return <Loading />;
  console.log("--- data: ---");
  console.log(data);
  return (
    <>
      <NextHead title="My US Stock Portfolio | Test" />
    </>
  );
};
export default Test;
