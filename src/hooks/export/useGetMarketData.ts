import { gql, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { MarketData } from "../../types/marketData.type";

export function useGetMarketData(tickerList: string[]) {
  const GET_MARKETDATA = gql`
    query GetMarketPrices($tickerList: [String]!) {
      getMarketPrices(tickerList: $tickerList) {
        ticker
        currentPrice
        currentRate
        priceGets
      }
    }
  `;
  const { data, loading } = useQuery(GET_MARKETDATA, {
    variables: { tickerList },
  });
  const marketData: MarketData[] = data?.getMarketPrices;
  return {
    marketData: loading ? HOOKS_STATE.LOADING : marketData,
  };
}
