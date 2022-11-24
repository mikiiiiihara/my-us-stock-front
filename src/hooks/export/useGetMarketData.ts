import { gql } from "@apollo/client";

export const GET_MARKETDATA = gql`
  query getRealtimeData($tickerList: [String]!) {
    getRealtimeData(tickerList: $tickerList) {
      c
      d
      dp
    }
  }
`;
