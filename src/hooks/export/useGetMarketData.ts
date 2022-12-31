import { gql, useQuery } from "@apollo/client";
import { HOOKS_STATE } from "../../constants/hooks";
import { MarketData } from "../../types/marketData.type";

export function useGetMarketData(tickerList: string[]) {
  const GET_MARKETDATA = gql`
    query getRealtimeData($tickerList: [String]!) {
      getRealtimeData(tickerList: $tickerList) {
        c
        d
        dp
      }
    }
  `;
  const { data, loading } = useQuery(GET_MARKETDATA, {
    variables: { tickerList },
  });
  const marketData: MarketData[] = data?.getRealtimeData;
  return {
    marketData: loading ? HOOKS_STATE.LOADING : marketData,
  };
}
