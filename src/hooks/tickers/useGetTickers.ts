import { gql } from "@apollo/client";

export const GET_TICKERS = gql`
  query GetTickers($user: String) {
    readAllTickers(user: $user) {
      id
      ticker
      getPrice
      quantity
      user
      dividend
      dividendTime
      dividendFirstTime
      sector
      usdjpy
    }
  }
`;
