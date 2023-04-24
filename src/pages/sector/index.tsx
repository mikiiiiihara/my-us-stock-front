import { GetStaticProps } from "next";
import Header from "../../components/common/header/header";
import { SectorContent } from "../../contents/sector/sectorContent";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { MarketData } from "../../types/marketData.type";
import { client } from "../_app";

type Response = {
  getMarketPrices: MarketData[];
};
//ページコンポーネントのpropsの型定義（ここでは空）
type SSGProps = {
  sectors: MarketData[];
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

const Sector: React.FC<SSGProps> = (props) => {
  const { sectors } = props;
  return (
    <>
      <Header title="My US Stock Portfolio | Sector" />
      <SectorContent sectors={sectors} />
    </>
  );
};
//getStaticPropsはビルドに実行される
//GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const { data } = await client.query<Response>({ query: GET_SECTORS });
  return {
    //ここで返したpropsを元にページコンポーネントを描画する
    props: { sectors: data.getMarketPrices },
  };
};
export default Sector;
