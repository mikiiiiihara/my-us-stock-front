import { gql } from "@apollo/client";

export const CREATE_TICKER = gql`
  mutation createTicker(
    $ticker: String!
    $getPrice: Float!
    $quantity: Int!
    $user: String!
    $dividend: Float!
    $dividendTime: Int!
    $dividendFirstTime: Int!
    $sector: String!
    $usdjpy: Float!
  ) {
    createTicker(
      ticker: $ticker
      getPrice: $getPrice
      quantity: $quantity
      user: $user
      dividend: $dividend
      dividendTime: $dividendTime
      dividendFirstTime: $dividendFirstTime
      sector: $sector
      usdjpy: $usdjpy
    ) {
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
