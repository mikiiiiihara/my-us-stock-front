import { gql } from "@apollo/client";

export const UPDATE_TICKER = gql`
  mutation updateTicker($id: Int!, $getPrice: Float, $quantity: Int, $dividend: Float, $usdjpy: Float) {
    updateTicker(id: $id, getPrice: $getPrice, quantity: $quantity, dividend: $dividend, usdjpy: $usdjpy) {
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